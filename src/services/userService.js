import axios from "axios";

const apiUrl = 'https://seif-task-manager-api.herokuapp.com/';

export async function getUser() {
  try {
    const response = await axios.get(apiUrl + 'users/user-details', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error.response.status;
  }

}

export async function signup(user) {
  try {
    const response = await axios.post(apiUrl + 'users/signup', user);
    if (response.status === 201) {
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
    if (response.status === 200) {
      localStorage.setItem('jwt-token', response.data.token);
      return response.data.userObject;
    }
  } catch (error) {
    return error.response.status;
  }

}
export async function logout() {
  try {
    const response = await axios.post(apiUrl + 'users/logout', {}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
      }
    });
    if (response.status === 200) {
      localStorage.setItem('jwt-token', '');
      return;
    }
  } catch (error) {
    return error.response.status;
  }

}
export async function logoutAll() {
  try {
    const response = await axios.post(apiUrl + 'users/logout-all', {}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
      }
    });
    if (response.status === 200) {
      localStorage.setItem('jwt-token', '');
      return;
    }
  } catch (error) {
    return error.response.status;
  }

}
export async function updateAccount(account) {
  try {
    const response = await axios.post(apiUrl + 'users/update', account, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
      }
    });
    if (response.status === 200) {
      return;
    }
  } catch (error) {
    return error.response.status;
  }

}

export async function deleteAccount() {
  try {
    const response = await axios.post(apiUrl + 'users/delete', {}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
      }
    });
    if (response.status === 200) {
      localStorage.setItem('jwt-token', '');
      return;
    }
  } catch (error) {
    return error.response.status;
  }

}

