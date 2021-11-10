const functions = require("firebase-functions");

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