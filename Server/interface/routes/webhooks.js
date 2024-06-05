const express=require('express')
require('dotenv').config();
const Router = express.Router()
const stripeSecretKey = process.env.STRIPE_SECRETKEY;
const stripe = require('stripe')(stripeSecretKey);
const Query=require("../../infrastructure/DBquerys/Users/usersCrud")

Router.post('/',express.raw({ type: 'application/json' }),async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.WEBHOOK_ENDPOINT;

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log(session,"==>")
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        console.log('PaymentIntent:', paymentIntent);
        const paymentId = paymentIntent.id;
        const amount = paymentIntent.amount;
        const chargeId = paymentIntent.latest_charge
        const { doctorId, userId, date, shift } = session.metadata;
        const updatedData = {
            doctorId: doctorId,
            userId: userId,
            date: date,
            shift: shift,
            payment:{
              chargeId:chargeId,
                paymentId: paymentId,
                  amount: amount
            }
          };
          await Query.placeBooking(updatedData)

      } catch (error) {
        console.error('Error retrieving payment intent:', error.message);
      }
    }
    res.json({ received: true });
  })


  module.exports=Router