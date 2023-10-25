import { useEffect, useState } from 'react';

import { auth, firestore, storage } from './firebase/FirebaseConfig';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc, where, query, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from "firebase/storage";

import Checkout from './checkout/checkout';

export default function Admin() {
   const [isAdminUser, setIsAdminUser] = useState(false);
   const [requests, setRequests] = useState([]);
   const [viewClosed, setViewClosed] = useState(false); //make sure this is booean type in handelChange, because in select this will turn to string!
   const [checkoutData, setCheckoutData] = useState("");

   //get requests when page showing up and view changed(closed or opening).
   useEffect(() => {
      const unsubscribeFromAuth = onAuthStateChanged(auth, userAuth => {
         console.log(typeof viewClosed, viewClosed);
         if (userAuth) {
            if (userAuth.uid === "6QcTieY5AkNfV99C9Omb2zzv6p22") { //*this id varies acrross projects 
               //Enable displaying contents
               setIsAdminUser(true);
               //DL requests
               const ref = query(collection(firestore, 'requests'), where("closed", "==", viewClosed));//with where
               //const ref = collection(firestore, 'requests') ;  //without where
               async function getRequestData() {
                  let results = [];
                  const getData = await getDocs(ref);
                  getData.docs.forEach(doc => {
                     results.push({ id: doc.id, ...doc.data() })
                  })
                  setRequests(results);
               }
               getRequestData();
            } else {
               setIsAdminUser(false);
            }
         } else {
            setIsAdminUser(false);
         }
      })
      return () => {
         unsubscribeFromAuth();
      }
   }, [viewClosed]);

   //Google signin func
   function handleGoogleSignIn() {
      const provider = new GoogleAuthProvider();
      /*provider.setCustomParameters({
         prompt: "select_account"
      });*/
      return signInWithPopup(auth, provider);
   }
   //Google signout func
   async function handleLogout() {
      try {
         await signOut(auth);
      } catch (err) {
         console.log(err.message);
      }
   }

   //handle editable field change
   const handleChange = (type, value, id) => {
      if (type === "progress") {
         setRequests(requests.map(r =>
            r.id === id ? { ...r, progress: value } : r
         ));
      } else if (type === "closed") {
         setRequests(requests.map(r =>
            r.id === id ? { ...r, closed: !r.closed } : r
         ));
      } else if (type === "view") {
         setViewClosed((value === "true"));//here we make sure this is booean type, because in select this will turn to string!
      }
      return;
   }

   //update request
   async function updateReq(id, req) {
      try {
         let ref = doc(firestore, 'requests', id);
         await updateDoc(ref, {
            /* update all fields 
            ...req*/
            //if update certain field, use below
            closed: req.closed,
            progress: req.progress
         });
         /*update all fields is also same as below,
         await setDoc(ref, state);*/
         alert("update done.");
      } catch (err) {
         console.log(err.message);
      }
   }
   //Delete request(delete button only show when viewClosed filter)
   async function deleteReq(id, filePath) {
      //delete firestore
      try {
         await deleteDoc(doc(firestore, "requests", id));
      } catch (err) {
         console.log(err);
      }
      //delete storage
      console.log(filePath);
      const desertRef = ref(storage, filePath);
      try {
         await deleteObject(desertRef);
      } catch (err) {
         console.log(err);
      }
      alert("deleted");
   }
   //give email and orderid to checkout form
   const toCheckout = (id) => {
      setCheckoutData(requests.find(req => { return req.id === id }));
   }

   return (
      <div className="App">
         {isAdminUser ?
            <>
               <div>
                  <h3>Admin Page</h3>
                  <button onClick={() => {
                     handleLogout();
                  }}>Logout</button>
               </div>
               <div>
                  <Checkout parentToChild={checkoutData} />
               </div>
               <div>
                  <h3>Requests</h3>
                  <select value={viewClosed} onChange={(e) => handleChange("view", e.target.value, null)}>
                     <option key="1" value="false">In progress</option>
                     <option key="2" value="true">Closed</option>
                  </select>
                  {
                     requests && requests.map(request => (
                        <div className="show-item" key={request.id}>
                           <hr />
                           <p>Name: {request.cName}</p>
                           <p>Email: {request.cEmail}</p>
                           <p>OrderID: {request.orderID}</p>
                           <p>fileUrl: <a href={`${request.fileUrl}`}>{request.filePath}</a></p>
                           <textarea
                              defaultValue={request.progress} onChange={(e) => handleChange("progress", e.target.value, request.id,)}>
                           </textarea>
                           <input type="checkbox" id="closed" checked={request.closed}
                              onChange={(e) => handleChange("closed", e.target, request.id)}
                           />
                           <label htmlFor="closed" >CLOSED</label>
                           <div>
                              <button onClick={() => updateReq(request.id, request)}>Apply Changes: "{request.cName}"</button>
                           </div>

                           {viewClosed ?
                              <><button onClick={() => deleteReq(request.id, request.filePath)}>Delete</button></>
                              :
                              <>
                                 <button onClick={() => toCheckout(request.id)}>To Checkout</button>
                              </>
                           }
                        </div>
                     ))
                  }
               </div>
            </>
            :
            <>
               <h3>Sign in as Admin</h3>
               <button onClick={handleGoogleSignIn}>Sign-in with Google</button>
            </>
         }
      </div >
   );
}
