const functions = require("firebase-functions");
const admin = require('firebase-admin');
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
    console.log(JSON.stringify(fcmTokens))
    console.log(request.body.title)
    console.log(request.body.message)
    const message = {
        notification: {
            title: request.body.title,
            body: request.body.message,
            image: request.body.image,
        },
        token: fcmTokens,
    };
    admin.messaging().multicast(message).then((response) => {
        console.log('Successfully sent message:', response);
        console.log('Successfully sent messages count:', response.successCount);
        return {success: true};
    }).catch((error) => {
        console.log('Error sending message:', error);
    });
});