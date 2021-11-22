const functions = require("firebase-functions");
const admin = require('firebase-admin');
const paypal = require('paypal-rest-sdk');
var serviceAccount = require("./the-essential-machine-firebase-adminsdk-13l4t-be8ca7e692.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://the-essential-machine-default-rtdb.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const stripe = require('stripe')('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');

exports.applePay = functions.https.onRequest((request, response) => {
    // eslint-disable-next-line promise/catch-or-return
    stripe.charges.create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: request.body.token,
        // source: "tok_mastercard"
    }).then((charge) => {
            console.log("Entered Fetch")
            // asynchronously called
            response.send(charge);
        })
        .catch(err =>{
            console.log(err);
        });
});

exports.sendNotification = functions.https.onRequest((request, response) =>{
    fcmTokens = request.body.fcmTokens;
    console.log(fcmTokens)
    console.log(request.body.title)
    console.log(request.body.message)
    console.log(request.body.image)
    const message = {
        notification: {
            title: request.body.title,
            body: request.body.message,
            image: request.body.image,
        },
        tokens: fcmTokens,
    };
    admin.messaging().sendMulticast(message).then((response) => {
        console.log('Successfully sent message:', response);
        console.log('Successfully sent messages count:', response.successCount);
        return {success: true};
    }).catch((error) => {
        console.log('Error sending message:', error);
    });
});

paypal.configure({
    'mode': 'live', //sandbox or live
    'client_id': 'Ab3G0m6vXtkPAfpx5HRCVhzSDIxXIC6u7dI_TZMXdiW-3ts_VMmdnA1pWMMoB0UXEy6AldzaTVUV0TIe',
    'client_secret': 'ELlPAi4hNSNk64sOVZABiO3OoKGNLyEQ1P59Xnm6yfNJqzUO6rwd6U3TMYRqGRYIvXeyusr4scTWr8h4'
});

exports.paypal = functions.https.onRequest((request, response) => {
    console.log(request.body.amount)
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://us-central1-the-essential-machine.cloudfunctions.net/success",
            "cancel_url": "https://us-central1-the-essential-machine.cloudfunctions.net/cancel",
        },
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": request.body.amount,
            },
            "description": "Paying Vending Machine"
        }]
    };
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            response.redirect(payment.links[1].href);
        }
    });

});

exports.success = functions.https.onRequest((request, response) => {
    console.log(request.body.amount)
    console.log("Success!!");
    var PayerID = request.query.PayerID;
    var paymentId = request.query.paymentId;
    var execute_payment_json = {
        "payer_id": PayerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
        }
    });
});

exports.cancel = functions.https.onRequest((request, response) => {
    console.log("Transaction Cancelled");
});