import { ActionReducerMap } from '@ngrx/store';
import * as ui from './../ngrx/ui/ui.reducer';
import * as auth from './../ngrx/auth/auth.reducer';


export interface AppState {
   ui: ui.State,
   auth: auth.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.loadingReducer,
   auth: auth.authReducer,
}
