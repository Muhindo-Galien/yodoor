import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./component/auth/ForgotPassword";
import Login from "./component/auth/login/Login";
import Register from "./component/auth/Register";
import Home from "./pages/Home";
import Room from "./pages/rooms/Room";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/forgot_password" element={<ForgotPassword/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/rooms" element={<Room/>} />
    </Routes>
  );
}

export default App;
