import { createReducer, on } from '@ngrx/store';
import { Wallet } from 'src/app/interface/wallet.interface';
import { setItems, unSetItems } from './wallet.actions';
import { AppState } from '../app.reducer';

export interface State {
  items:Wallet[]
}

export interface AppWalletState extends AppState {
  wallet:State
}

export const initialState: State = {items:[]};

export const walletReducer = createReducer(
initialState,
on(setItems, (state,{items}) => ({...state,items:[...items]})),
on(unSetItems, (state) => ({...state,items:[]})),
);
