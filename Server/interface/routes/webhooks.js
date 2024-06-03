const express=require('express')
const Router = express.Router()
const stripeSecretKey = process.env.STRIPE_SECRETKEY;
const stripe = require('stripe')(stripeSecretKey);
const Query=require("../../infrastructure/DBquerys/Users/usersCrud")

Router.post('/',express.raw({ type: 'application/json' }),async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = "whsec_f5361d4e4925ebee64059e202946d5900aac11f63fa181ef90b674afb1b189c0";

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        console.log('PaymentIntent:', paymentIntent);
        const paymentId = paymentIntent.id;
        const amount = paymentIntent.amount;
        const { doctorId, userId, date, shift } = session.metadata;
        const updatedData = {
            doctorId: doctorId,
            userId: userId,
            date: date,
            shift: shift,
            payment:{
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