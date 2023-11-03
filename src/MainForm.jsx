import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore, storage } from "./firebase/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function MainForm() {
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
      if (!cName || !cEmail || !cRequest) {
         alert("問い合あせ内容を埋めたうえで提出ください");
         return;
      }
      var ans = window.confirm("この内容で提出してもよろしいでしょうか");
      if (!ans) { return; }

      //upload file to storage
      const orderID = gen4Digit();
      const createdAt = new Date().toLocaleDateString('sv-SE');
      const path = `requests/${createdAt}-${cName}-${orderID}`
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
      <div id="form-div">
         {(percent === 0) ?
            <form className="form" id="form1" onSubmit={handleSendForm}>
               <p className="name">
                  <input type="text" onChange={e => setCName(e.target.value)}
                     value={cName} id="name" name="name" placeholder="お名前"
                     className="validate[required,custom[onlyLetter],length[0,100]] feedback-input" />
               </p>
               <p className="email">
                  <input
                     type='email' name="email" id="email"
                     className="validate[required,custom[email]] feedback-input"
                     onChange={e => setCEmail(e.target.value)}
                     placeholder="メールアドレス"
                     value={cEmail}
                  />
               </p>
               <label htmlFor="form-image">ファイル選択(任意。複数ある場合はzip化。)</label>
               <input type="file" id="form-image" onChange={handleChange} accept="/image/*" />

               <p className="text">
                  <textarea type="text" name="text" id="comment"
                     className="validate[required,length[6,300]] feedback-input"
                     placeholder="ご要望（例：キーEの楽譜をキーCに移調したい。コード表記は要、歌詞は不要。）"
                     onChange={e => setCRequest(e.target.value)} value={cRequest} />
               </p>
               <button className="button-blue">
                  送 信
               </button>
            </form>
            :
            <p>{percent} % 提出中</p>
         }
      </div >
   );
}
