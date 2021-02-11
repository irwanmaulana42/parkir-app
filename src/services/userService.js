import axios from 'axios';
import { authHeader, getUser } from './authHeader';

const API_URL = 'http://localhost:8000/api/v1';

class UserService {
  getTodos() {
    return axios.get(API_URL + '/todos', {
      headers: authHeader(),
      params: {
        user_id: getUser().id
      }
    })
      .then((response) => {
        return Promise.resolve(response.data)
      })
  }

  checkLogin() {
    return axios.get(API_URL + '/verify', {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  postTodos(task, label_id) {
    const params = new URLSearchParams();
    params.append('task', task);
    params.append('user_id', getUser().id);
    params.append('label_id', label_id);
    return axios.post(API_URL + '/todos/store', params, {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  editTodos(task, label_id, id) {
    console.log('task', task);
    console.log('label', label_id);
    console.log('id', id);
    const params = new URLSearchParams();
    params.append('task', task);
    params.append('user_id', getUser().id);
    params.append('label_id', label_id);
    return axios.put(API_URL + '/todos/edit/' + id, params, {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  setCompletedTodos(value, id) {
    const params = new URLSearchParams();
    params.append('completed', value);
    params.append('user_id', getUser().id);
    return axios.put(API_URL + '/todos/edit/' + id, params, {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  deleteTodos(id) {
    return axios.delete(API_URL + '/todos/delete/' + id, {
      headers: authHeader()
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  getLabels() {
    return axios.get(API_URL + '/label', {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  postLabel(label, desc) {
    const params = new URLSearchParams();
    params.append('label', label);
    params.append('desc', desc);
    return axios.post(API_URL + '/label/store', params, {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  editLabel(label, desc, id) {
    const params = new URLSearchParams();
    params.append('label', label);
    params.append('desc', desc);
    return axios.put(API_URL + '/label/edit/' + id, params, {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  deleteLabel(id) {
    return axios.delete(API_URL + '/label/delete/' + id, {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  getUsers() {
    return axios.get(API_URL + '/users', {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  postUser(name, username, password, is_admin) {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('username', username);
    params.append('password', password);
    params.append('is_admin', is_admin);
    return axios.post(API_URL + '/users/store', params, {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  confirmUser(id) {
    const params = new URLSearchParams();
    return axios.post(API_URL + '/users/confirmation/' + id, params, {
      headers: authHeader(),
    })
      .then((response) => {
        console.log('confirm', response);
        return Promise.resolve(response.data);
      })
  }

  editUser(name, username, is_admin, id) {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('username', username);
    params.append('is_admin', is_admin);
    return axios.put(API_URL + '/users/edit/' + id, params, {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }

  deleteUser(id) {
    return axios.delete(API_URL + '/users/delete/' + id, {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  kendaraanMasuk(plat_nomor, jenis_kendaraan, merk) {
    const params = new URLSearchParams();
    params.append('plat_nomor', plat_nomor);
    params.append('jenis_kendaraan', jenis_kendaraan);
    params.append('merk', merk);
    return axios.post(API_URL + '/transaction/store', params, {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  kendaraanKeluar(kode) {
    const params = new URLSearchParams();
    params.append('kode', kode);
    return axios.post(API_URL + '/transaction/edit', params, {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data);
      })
  }

  getHistoryTransaction(page = 1, limit = 10) {
    return axios.get(API_URL + '/transaction/history', {
      headers: authHeader(),
      params: {
        page: page, 
        limit: limit
      }
    })
      .then((response) => {
        return Promise.resolve(response.data)
      })
  }

  getReportCOuntKendaraan() {
    return axios.get(API_URL + '/transaction/', {
      headers: authHeader(),
    })
      .then((response) => {
        return Promise.resolve(response.data)
      })
  }

}

export default new UserService();