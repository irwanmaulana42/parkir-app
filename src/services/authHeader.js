import jwt_decode from 'jwt-decode';
const user = JSON.parse(localStorage.getItem("user"));
const authHeader = () => {
  if(user){
    return {
      Authorization: 'bearer ' + user.token
    };
  }else{
    return {};
  }
}

const getUser = () => {
  if(user){
    return jwt_decode(user.token);
  }else{
    return {};
  }
}

export {
  authHeader,
  getUser,
};