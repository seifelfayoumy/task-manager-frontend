import axios from "axios";

const apiUrl = 'http://localhost:3005/';

export async function createTask(task) {
  try {
    const response = await axios.post(apiUrl + 'tasks', task, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
      }
    });
    if (response.status == 201) {
      return response.data;
    }
  } catch (error) {
    return error.response.status;
  }

}

export async function updateTask(task) {
  try {
    const response = await axios.patch(apiUrl + 'tasks', task, {
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