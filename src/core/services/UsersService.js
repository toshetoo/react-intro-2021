import axios from 'axios';
import { register } from './AuthService';
import { deleteTask, getTasksByCreatorId } from './TasksService';

const apiUrl = 'http://localhost:3000';

export async function getAllUsers(searchParam) {
    const users = (await axios.get(`${apiUrl}/users`)).data;

    if (!searchParam)
        return users;

    searchParam = searchParam.toLowerCase();

    return users.filter(user => user.name.toLowerCase().includes(searchParam) || user.email.toLowerCase().includes(searchParam));
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