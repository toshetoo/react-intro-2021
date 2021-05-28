import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { usersReducer } from './../reducers/users-reducer';

export const store = createStore(usersReducer, applyMiddleware(thunk));