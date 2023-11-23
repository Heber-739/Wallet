import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interface/user.interface';
import { setUser,unSetUser } from './auth.action';

export interface State {
  user:User|null;
}

export const initialState: State = {user:null};

export const authReducer = createReducer(
initialState,
on(setUser, (state,{user}) => ({...state,user:{...user}})),
on(unSetUser, (state) => ({...state,user:null})),
);
