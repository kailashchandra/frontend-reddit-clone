import { createReducer, on } from '@ngrx/store';
import { UserState } from '../user.state';
import { login, logout } from './../actions/auth.actions';

const initialState : UserState = {
    isLoggedIn: false,
    username: ''
};

const _createStateReducer = createReducer(initialState,
    on(login, (state : UserState, { loggedInStatus, nameOfUser })=>({ isLoggedIn: loggedInStatus, username: nameOfUser })),
    on(logout, (state : UserState)=>({ isLoggedIn: false, username: '' })));

export function stateReducer(state, action) {
    return _createStateReducer(state, action);
}