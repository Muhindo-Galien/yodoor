import {
    Route,
    Navigate 
  } from "react-router-dom";
  import { useSelector } from "react-redux";

  const PrivateRoute = ({...rest})=>{
    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token)
    return auth&&token ? <Route {...rest}/> : <Navigate  to='/login'/>;
  }
  export default PrivateRoute;