import Main from "./Main"
import MainThanks from "./MainThanks";
import MainCheckouted from "./MainChekouted";
import Admin from "./Admin";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/thanks" element={<MainThanks />} />
        <Route path="/success" element={<MainCheckouted />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App;
