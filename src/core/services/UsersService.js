import axios from 'axios';
import { register } from './AuthService';

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
export function deleteUser(id) {
    return axios.delete(`${apiUrl}/users/${id}`);
}