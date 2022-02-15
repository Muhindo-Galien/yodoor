import { Route, Routes } from "react-router-dom";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Home from "./component/booking/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
  );
}

export default App;
