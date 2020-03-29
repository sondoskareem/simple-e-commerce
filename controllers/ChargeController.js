

// var secret_key = process.env.SK_TEST
// var public_key = process.env.PK_TEST
var secret_key ='xxxxxxxx'
var public_key ='xxxxxxx'
const stripe = require('stripe')(secret_key)
// Charge Route

exports.charge = (req, res) => {
    const amount = req.body.price;
    const description = req.body.description;
    
    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
      amount,
      description: description,
      currency: 'usd',
      customer: customer.id
    }))
    .then(charge =>{

      
       res.status(200).send('success')
      });
  }