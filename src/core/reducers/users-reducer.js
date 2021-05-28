import { CLEAR_SELECTED_USER, DELETE_USER, EDIT_USER, GET_ALL_USERS, GET_USER_BY_ID } from "../action-types/user-action-types";
import { SAVE_USER } from './../action-types/user-action-types';

const initialState = {
    users: [],
    user: {}
}

/**
 * 
 * { 
 *  action: 'GET_ALL_USERS',
 *  payload: [{ user }, { user }, { user }]
 * }
 */

export function usersReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_USERS: 
            return { ...state, users: action.payload };
        case DELETE_USER: 
            return { ...state, users: state.users.filter(user => user.id !== action.payload)}
        case GET_USER_BY_ID: 
            return { ...state, user: action.payload };
        case EDIT_USER: 
            return { ...state, user: { ...state.user, ...action.payload }};
        case SAVE_USER: 
            return { ...state, users: [...state.users.filter(u => u.id !== action.payload.id), action.payload], user: {} }
        case CLEAR_SELECTED_USER: 
            return { ...state, user: action.payload };
        default: 
            return state;
    }
}

// Flow when editing a user and mutatiting the state
// ---------------------------------------------------
//user =>  { id: dfsfs, name: fdsfsd, email: fdsafsd }
// payload => { name: aaaa }
// { id: dfsfs, email:fdsafsd, name: aaaa }