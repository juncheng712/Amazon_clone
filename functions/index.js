const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51J2rQOF33e4KnOWFI8nJmNgnO1BOcDUgjPCmaSdMQrCNe3EDvuFtxKlsyEZK9hiGJDSc2IVyTgmUkNHRhqIc8fxj00dTntIl3i');


// API


//  - App config
const app = express();

//  - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//  - API routes
app.get('/', (request, response) => {
    response.status(200).send('hello world')
})


app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment Request Received!!! >>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,  // subunit of the currency
        currency: "usd",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});


//  - Listen command
exports.api = functions.https.onRequest(app)

// example endpoint
//http://localhost:5001/clone-5bdd0/us-central1/api