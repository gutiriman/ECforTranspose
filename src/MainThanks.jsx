import { Link, useLocation } from "react-router-dom"

export default function MainThanks() {
   //get state of name passed from Main by using useLocation
   const location = useLocation();
   const name = location.state.name
   return (
      <div>
         <div>
            {name}様　お問い合わせいただき、ありがとうごいます。
            のちほど、お見積りの結果について、いただきましたメールアドレス宛に返信させていただきます。
         </div>
         <Link to="/"><button>戻る</button></Link>
      </div>
   )
}