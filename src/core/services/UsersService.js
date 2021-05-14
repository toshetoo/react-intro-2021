import axios from 'axios';
import { register } from './AuthService';
import { deleteTask, getTasksByCreatorId } from './TasksService';

const apiUrl = 'http://localhost:3000';

export function getAllUsers() {
    return axios.get(`${apiUrl}/users`);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/users/${id}`);
}

/**
 * 
 * @param {userData} userData => holds the information about the user that we're going to edit
 */
export function saveUser(userData) {
    if (userData.id) {
        return axios.put(`${apiUrl}/users/${userData.id}`, userData);
    }

    return register(userData);
}

/**
 * 
 * @param {id} id => the id of the user that should be deleted 
 */
export async function deleteUser(id) {
    const userTasks = await getTasksByCreatorId(id);
    
    const deleteRequests = [];
    userTasks.forEach(task => {
        deleteRequests.push(deleteTask(task.id));
    });

    await Promise.all(deleteRequests);

    return axios.delete(`${apiUrl}/users/${id}`);
}