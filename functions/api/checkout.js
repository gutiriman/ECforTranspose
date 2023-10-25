const stripeAPI = require('../stripe');

async function createCheckoutSession(req, res) {
   let domainUrl;
   if (process.env.FUNCTIONS_EMULATOR) {
      domainUrl = process.env.WEB_APP_URL
   } else {
      domainUrl = "http://localhost:3000";
   }

   const { line_items, Order_ID, email } = req.body;
   // check req body has line items
   if (!line_items || !Order_ID) {
      return res.status(400).json({ error: 'missing required session parameters' });
   }
   let session;

   try {
      session = await stripeAPI.checkout.sessions.create({
         payment_method_types: ['card'],
         mode: 'payment',
         line_items,

         custom_text: {
            /*shipping_address: {
               message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
            },*/
            submit: {
               message: `OrderID: ${Order_ID}`,
            },
         },
         success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${domainUrl}/canceled`,
         customer_email: email,
         //shipping_address_collection: { allowed_countries: ['GB', 'US', 'JP'] }
         /*custom_fields: [
            {
               key: "OrderID",
               label: {
                  type: 'custom',
                  custom: 'OrderID',
               },
               type: 'text',
            },
         ],*/

      });
      res.status(200).json({ sessionId: session.id });
   } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'an error occured, unable to create session' });
   }
}

module.exports = createCheckoutSession;