import { Link, useLocation } from "react-router-dom"

export default function MainThanks() {
   //get state of name passed from Main by using useLocation
   const location = useLocation();
   const name = location.state.name
   return (
      <div>
         <div><br />
            {name}様　<br /><br />お問い合わせいただきありがとうごいます。
            後ほど、お見積りの結果についていただきましたメールアドレス宛に返信させていただきます。<br />
            引き続き、よろしくお願いいたします。
         </div>
         <Link to="/"><button>戻る</button></Link>
      </div>
   )
}