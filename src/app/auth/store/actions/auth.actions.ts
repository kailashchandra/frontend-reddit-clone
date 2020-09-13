import { createAction, props } from '@ngrx/store';

export const login = createAction('[LoginComponent] login', props<{ loggedInStatus:boolean, nameOfUser: string }>());
export const logout = createAction('[LoginComponent] logout');