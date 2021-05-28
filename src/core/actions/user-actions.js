import { deleteUser, getAllUsers, getUserById } from "../services/UsersService"
import { CLEAR_SELECTED_USER, DELETE_USER, EDIT_USER, GET_ALL_USERS, GET_USER_BY_ID, SAVE_USER } from './../action-types/user-action-types';
import { saveUser } from './../services/UsersService';

export function getAllUsersFromAPI(searchParam) {
    return dispatch => {
        getAllUsers(searchParam).then(users => {
            dispatch({
                type: GET_ALL_USERS,
                payload: users
            })
        })
    }
}

export function deleteUserFromAPI(id) {
    return dispatch => {
        deleteUser(id).then(_ => {
            dispatch({
                type: DELETE_USER,
                payload: id
            });
        })
    }
}

export function saveUserInAPI(userData) {
    return dispatch => {
        saveUser(userData).then(_ => {
            dispatch({
                type: SAVE_USER,
                payload: userData
            });
        });
    }
}

export function getUserByIdFromAPI(id) {
    return dispatch => {
        getUserById(id).then(user => {
            dispatch({
                type: GET_USER_BY_ID,
                payload: user.data
            });
        })
    }
}

export function editUser(userData) {
    return dispatch => {
        dispatch({
            type: EDIT_USER,
            payload: userData
        });
    }
}

export function clearSelectedUser() {
    return dispatch => {
        dispatch({
            type: CLEAR_SELECTED_USER,
            payload: {
                name: '',
                email: '',
                phone: '',
                picture: ''
            }
        });
    }
}