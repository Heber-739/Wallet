import { ActionReducerMap } from '@ngrx/store';
import * as ui from './../ngrx/ui/ui.reducer';
import * as auth from './../ngrx/auth/auth.reducer';
import * as wallet from './../ngrx/wallet/wallet.reducer';


export interface AppState {
   ui: ui.State,
   auth: auth.State,
  //  wallet:wallet.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.loadingReducer,
   auth: auth.authReducer,
  //  wallet:wallet.walletReducer
}
