import MainForm from "./MainForm";

export default function Main() {
   return (
      <div>
         <header className="header">
            <div className="logo">
               <img
                  src="https://firebasestorage.googleapis.com/v0/b/react-ec-5b0b3.appspot.com/o/admin%2Flogo.png?alt=media&token=ff010e07-9e98-4436-9734-2e5b203cc279&_gl=1*pbf26r*_ga*MTUzMzE0MTgwOC4xNjUwNjcyNzM3*_ga_CW55HF8NVT*MTY5ODk2NjAwOS40MS4xLjE2OTg5Njc3OTQuNDEuMC4w"
                  alt="" />
               <h1>T<span>S</span>core</h1>
            </div>
            <div>
               <a href="mailto:gutiriman3@gmail.com">メールお問合せ</a>
            </div>
         </header>

         <div className="hero">
            <div className="hero-text">
               <div className="hero-text-left">
                  <h1>移調した楽譜を <br />作成いたします <br />（キー変更）</h1>
               </div>
               <div className="hero-text-right">
                  <p>楽譜移調サービスを利用し、演奏者の音域に合わせたキーに変更でき、演奏しやすくなります。また、楽器の音色を変えたい場合にも利用できます。
                  </p>
               </div>
            </div>
         </div >


         <h2>ご利用の流れ</h2>
         <div className="contact">
            <div className="step">
               <h3 className="circle">1</h3>
               <p>お問い合わせフォームまたはヘッダ部のメールお問合せにて、楽譜移調に関するご要望をお送りください。その際、移調希望の楽譜がある場合は添付をお願いいたします。<br />
                  ※添付ファイルはPDF、または写真や画像データでも問題ございません。
               </p>
               <h3 className="circle">2</h3>
               <p>お問い合わせいただいた内容をもとに、お見積り結果とクレジットカード決済用のリンクを送付させていただきます。<br />（決済はPayPayや銀行振込でも可能ですのでお申しつけください。）</p>
               <h3 className="circle">3</h3>
               <p>クレジットカード等ご入金確認後、移調作業を開始します。完了次第、移調後の楽譜をPDF形式でいただいたメールアドレス宛に納品させていただきます。また、納品後にご指摘がある場合は無料で修正いたします。
               </p>
            </div>
            <MainForm />
         </div>

         <h2>料金について</h2>
         <div className="price">
            <p className="price-explain">
               基本1ページあたり1000円となりますが、添付いただいた楽譜やご要望内容に基づきお見積りいたします。<br />この際、コード表記付き、歌詞付きといったご要望や楽譜密度等の要因で以下変動いたします。
            </p>
            <div className="price-wrapper">
               <div className="price-left">
                  <ul className="price_list">
                     <li><strong>基本料（音符・記号のみ）</strong>1000円/ページ</li>
                     <li><strong>コード表記付き</strong>500円/ページ</li>
                     <li><strong>歌詞付き</strong>500円/ページ</li>
                     <li><strong>音符密度が高いもの</strong>500～1000円/ページ</li>
                     <li><strong>24時間以内納品（通常は3～4日以内）</strong>3000円/曲</li>
                  </ul>
               </div>
               <div className="working">
                  <img
                     src="https://firebasestorage.googleapis.com/v0/b/react-ec-5b0b3.appspot.com/o/admin%2Fworking-min.jpg?alt=media&token=44725108-a2d0-4d40-a1d2-91f473ca4264&_gl=1*ut79he*_ga*MTUzMzE0MTgwOC4xNjUwNjcyNzM3*_ga_CW55HF8NVT*MTY5ODk2NjAwOS40MS4xLjE2OTg5NjYzNjEuNjAuMC4w"
                     alt="" />
                  <p>
                     作業イメージ
                  </p>
               </div>

            </div>
         </div>

         <div className="footer">
            <p>© 2023 TScore</p>
         </div>
      </div >
   )
}