

export const authReducer = (state={name:"galien",age:21},action)=>{
    switch(action.type){
      case "LOGIN_USER":
        return {...state, ...action.state};
      case "LOGOUT_USER":
        return action.payload;
      default:
          return state;
    }
  }