import axios from 'axios';

const API_URL = "http://localhost:8000/api/v1";

class AuthService {
  login(username, password){
    return axios.post(API_URL + '/login', {
      username, password
    })
    .then((response) => {
      if(response.data.code === 200){
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  register(name, username, password){
    return axios.post(API_URL + '/register', {
      name, username, password
    })
    .then((response) => {
      return response.data;
    });
  }

  logout(){
    localStorage.removeItem("user");
  }
}

export default new AuthService();

