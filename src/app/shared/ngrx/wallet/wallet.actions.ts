import { createAction, props } from '@ngrx/store';
import { Wallet } from 'src/app/interface/wallet.interface';

export const setItems = createAction(
  '[Wallet[]] setItems',
  props<{items:Wallet[]}>()
);

export const unSetItems = createAction('[Wallet[]] unSetItems')
