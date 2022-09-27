import axios from "axios";

const apiUrl = 'https://seif-task-manager-api.herokuapp.com/';

export async function createTask(task) {
  try {
    const response = await axios.post(apiUrl + 'tasks', task, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt-token')
      }
    });
    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    return error.response.status;
  }

}

export async function updateTask(task) {
  try {
    const response = await axios.post(apiUrl + 'tasks/update', task, {
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

export async function deleteTask(task) {
  try {
    const response = await axios.post(apiUrl + 'tasks/delete', task, {
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