import { Route, Routes } from "react-router-dom";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Home from "./component/booking/Home";
import Room from "./pages/rooms/Room";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/rooms" element={<Room/>} />
    </Routes>
  );
}

export default App;
