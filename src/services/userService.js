import axios from "axios";

const apiUrl = 'http://localhost:3005/';

export async function getUser() {
  try {
    const response = await axios.get(apiUrl + 'users/user-details', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
      }
    });
    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    return error.response.status;
  }

}

export async function signup(user) {
  try {
    const response = await axios.post(apiUrl + 'users/signup', user);
    if (response.status == 201) {
      localStorage.setItem('jwt-token', response.data.token);
      return response.data.userObject;
    }
  } catch (error) {
    return error.response.status;
  }

}

export async function login(user) {
  try {
    const response = await axios.post(apiUrl + 'users/login', user);
    if (response.status == 200) {
      localStorage.setItem('jwt-token', response.data.token);
      return response.data.userObject;
    }
  } catch (error) {
    return error.response.status;
  }

}

