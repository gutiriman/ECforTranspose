import { Link } from "react-router-dom"

export default function MainCheckouted() {
   return (
      <div>
         <div>
            <br />
            ご購入いただき、ありがとうございます。
            作業完了後メールで納品させていただきます。
         </div>
         <Link to="/"><button>戻る</button></Link>
      </div>
   )
}