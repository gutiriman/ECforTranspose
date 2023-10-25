import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const Checkout = ({ parentToChild }) => {
   //TODO: Add email and pass to stripe session
   const [email, setEmail] = useState("");
   const [Order_ID, setOrder_Id] = useState("");
   const [orderPrice, setPrice] = useState("");
   const stripe = useStripe();

   //update state whenever received new props("to check" button is clicked in admin page)
   useEffect(() => {
      setEmail((prevState) => parentToChild.cEmail ?? ""); //if parentTochild is null, then set ""
      setOrder_Id((prevState) => parentToChild.orderID ?? "");//if parentTochild is null, then set ""
   }, [parentToChild])

   //fetch server to reach stripe 
   let targetAPI;
   if (process.env.NODE_ENV !== 'production') {
      targetAPI = 'http://localhost:8080';
   } else {
      targetAPI = "https://us-central1-react-ec-5b0b3.cloudfunctions.net/app";
   }
   async function fetchFromAPI(endpoint, opts) {
      const { method, body } = { method: 'POST', body: null, ...opts };
      const res = await fetch(`${targetAPI}/${endpoint}`, {
         method,
         ...(body && { body: JSON.stringify(body) }),
         headers: {
            'Content-Type': 'application/json',
         },
      })
      return res.json();
   }
   //get session ID from stripe and redirect to stripe page
   const handleGuestCheckout = async (e) => {
      e.preventDefault();
      if (!email || !Order_ID || !orderPrice) {
         alert("fill all check out field");
         return;
      }
      var ans = window.confirm("この内容で決済作成してもよろしいでしょうか");
      if (!ans) { return; }

      const line_items = [{
         quantity: 1,
         price_data: {
            currency: 'jpy',
            unit_amount: orderPrice,
            product_data: {
               name: 'transpose',
               description: 'transpose',
               images: [],
            }
         }
      }]
      console.log(line_items);

      //create a checkout session and get back seesionID from stripe.
      const response = await fetchFromAPI('create-checkout-session', {
         body: { line_items, Order_ID, email },
      });
      //redirect to stripe checkout page with obtained sessionID
      const { sessionId } = response;
      const { error } = await stripe.redirectToCheckout({
         sessionId
      });

      if (error) {
         console.log(error);
      }
   }

   return (
      <div>
         <h3>Processing Checkout</h3>
         <form onSubmit={handleGuestCheckout}>
            <div>
               <label>email</label>
               <input
                  type='email'
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Email'
                  value={email}
               />
            </div>
            <div>
               <label>OrderId</label>
               <input type="text" onChange={e => setOrder_Id(e.target.value)} value={Order_ID} />
            </div>
            <div>
               <label>Price</label>
               <input type="number" onChange={e => setPrice(e.target.value)} />
            </div>
            <button>
               Checkout
            </button>
         </form>
      </div>
   )
}

export default Checkout;