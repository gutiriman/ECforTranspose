import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore, storage } from "./firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Main() {
   const [cName, setCName] = useState("");
   const [cEmail, setCEmail] = useState("");
   const [cRequest, setCRequest] = useState("");
   const Navigate = useNavigate();
   //uplaod file
   const [file, setFile] = useState("");
   const [percent, setPercent] = useState(0);
   // Handle file upload event and update state
   function handleChange(event) {
      setFile(event.target.files[0]);
   }
   // generate 4 digit order ID
   function gen4Digit() {
      var min = 10000;
      var max = 19999;
      var NUM = Math.floor(Math.random() * (max + 1 - min)) + min;
      var NUM2 = ('' + NUM).slice(-4);
      return NUM2;
   }

   async function handleSendForm(e) {
      e.preventDefault();
      //confirm input
      if (!file || !cName || !cEmail || !cRequest) {
         alert("問い合あせ内容を埋めたうえで提出ください");
         return;
      }
      var ans = window.confirm("この内容で提出してもよろしいでしょうか");
      if (!ans) { return; }

      //upload file to storage
      const createdAt = new Date().toLocaleDateString('sv-SE');
      const path = `requests/${createdAt}-${cName}`
      const storageRef = ref(storage, `${path}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      let fileUrl;
      uploadTask.on(
         "state_changed",
         (snapshot) => {
            const percent = Math.round(
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            // update progress
            setPercent(percent);
         },
         //when upload failed
         (err) => console.log(err),
         //when upload success
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
               fileUrl = downloadURL;
               //send request with fileurl to firestore
               try {
                  let orderID = gen4Digit();
                  const ref = collection(firestore, 'requests');
                  await addDoc(ref, { cName, cEmail, cRequest, closed: false, fileUrl, orderID, filePath: storageRef.fullPath, progress: "just requested" });
                  // setCEmail(""); setCName(""); setCRequest(""); *Not Need because navigating to another page later
               } catch (err) {
                  console.log(err.message);
               }
               Navigate("/thanks", { state: { name: cName } });//pass name to thanks page to display
            });
         }
      );
   }

   return (
      <div className="App">
         {(percent === 0) ?
            <form onSubmit={handleSendForm}>
               <div>
                  <div>
                     <label>名前</label>
                     <input type="text" onChange={e => setCName(e.target.value)} value={cName} />
                  </div>
                  <label>メールアドレス</label>
                  <input
                     type='email'
                     onChange={e => setCEmail(e.target.value)}
                     placeholder='Email'
                     value={cEmail}
                     className='nomad-input'
                  />
               </div>
               <div>
                  <label>楽譜データ（PDFまたは画像。）※複数ある場合はzip化で選択できます。</label>
                  <input type="file" onChange={handleChange} accept="/image/*" />
               </div>
               <div>
                  <label>内 容</label>
                  <textarea type="text" onChange={e => setCRequest(e.target.value)} value={cRequest} />
               </div>
               <button>
                  提出
               </button>
            </form>
            :
            <p>{percent} % 提出中</p>
         }
      </div >
   );
}
