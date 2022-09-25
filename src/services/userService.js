import axios from "axios";

const apiUrl = 'http://localhost:3005/';

export async function getUser() {
  try {
    const response = await axios.get(apiUrl + 'users/user-details', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-tokens')
      }
    });
    if (response.status == 200) {
      console.log(response.data);
      return response.data;
    }
    // return response;
  } catch (error) {
    return error;
  }

}

export async function signup(user) {
  try {
    const response = await axios.post(apiUrl + 'users/signup', {
      email: "seifdfvgersbhrrerrffffffcnjmk@gmail.com",
      password: "efjkndcsm34920@njdKJNM",
      firstName: "seif",
      lastName: "amr"
    }
    );
    if (response.status == 201) {
      console.log(response.data);
      localStorage.setItem('jwt-token', response.data.token);
      return response.data.user;
    }
    // return response;
  } catch (error) {
    return error;
  }

}