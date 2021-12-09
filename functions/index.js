const functions = require("firebase-functions");
const admin = require('firebase-admin');
const paypal = require('paypal-rest-sdk');
var serviceAccount = require("./the-essential-machine-firebase-adminsdk-13l4t-be8ca7e692.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://the-essential-machine-default-rtdb.firebaseio.com"
});

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

const runtimeOptions = {
  timeoutSeconds: 400,
  runWith: "2GB",
};


exports.sendNotification = functions
    .runWith(runtimeOptions)
    .https.onRequest((request, response) =>{
    fcmTokens = request.body.fcmTokens;
    console.log(fcmTokens)
    console.log(request.body.title)
    console.log(request.body.message)
    console.log(request.body.image)
    const message = {
        notification: {
            title: request.body.title,
            body: request.body.message,
        },
        android: {
              priority: "high",
            //   notification: {
            //     imageUrl: request.body.image,
            //   }
        },
        apns: {
            payload: {
                aps: {
                    'mutable-content': 1,
                    contentAvailable: true,
                }
            },
            // fcm_options: {
            //     image: request.body.image,
            // },
            headers: {
                "apns-push-type": "background",
                "apns-priority": "5", // Must be `5` when `contentAvailable` is set to true.
                "apns-topic": "org.reactjs.native.example.TEMAPP", // bundle identifier
            },
        },
        tokens: fcmTokens,
    };
    // const payload = {
    //     notification: {
    //         title: "Friend Request",
    //         body: "You just got a new friend request",
    //         icon: "default"
    //     }
    // };

    // admin.messaging().sendToDevice("e1Vn2sLhLV0:APA91bFMHcdkTK5xuwMB6gEpfbP_O5TBgEGT14ck0oKImi6qfe7nPkVPCNcTV-Oe2RSrFlUm1wAiRrC4toaRbhWSFCvEUADfim8JFm5ZDSixCRnlJA7hILK-HeKL4GnTUE_CeXaZZAmg",
    // payload).then(Response =>{ 
    //     console.log('this is the notification')
    // }).catch((error) => {
    //     console.log('Error sending message:', error);
    // });
    admin.messaging().sendMulticast(message).then((response) => {
        console.log('Successfully sent message:', response);
        console.log('Successfully sent messages count:', response.successCount);
        return {success: true};
    }).catch((error) => {
        console.log('Error sending message:', error);
    });
});

