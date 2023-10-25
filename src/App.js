import Main from "./Main"
import MainThanks from "./MainThanks";
import Admin from "./Admin";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/thanks" element={<MainThanks />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App;
