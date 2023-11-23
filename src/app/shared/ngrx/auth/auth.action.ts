import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interface/user.interface';

export const setUser = createAction(
  '[user] setUser',
  props<{user:User}>()
);
export const unSetUser = createAction('[user] unSetUser');
