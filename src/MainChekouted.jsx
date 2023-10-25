import { Link } from "react-router-dom"

export default function MainCheckouted() {
   return (
      <div>
         <div>
            ありがとうございます。
            後日メールにて、PDFでお送りします。
         </div>
         <Link to="/"><button>戻る</button></Link>
      </div>
   )
}