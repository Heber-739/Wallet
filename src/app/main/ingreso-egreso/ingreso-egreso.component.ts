import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { v4 as uidv4 } from 'uuid';


import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { WalletType } from 'src/app/interface/wallet.interface';
import { WalletService } from 'src/app/services/wallet.service';
import { AppState } from 'src/app/shared/ngrx/app.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  walletForm!:FormGroup;
  options = [WalletType.INCOME,WalletType.EGRESS]
  isLoading:boolean =false;
  private loadingSubs!:Subscription;

  private wallet:WalletService = inject(WalletService);
  private fb:FormBuilder = inject(FormBuilder)
  private uiStore:Store<AppState> = inject(Store<AppState>);


  constructor() { }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }

  ngOnInit() {
    this.initForm()
  }

  private initForm(){
    this.walletForm = this.fb.group({
      description:['',[Validators.required]],
      amount:[0,[Validators.required]],
      type:[WalletType.INCOME,[Validators.required]]
    })
    this.loadingSubs =this.uiStore.select('ui')
    .subscribe(({isLoading})=> this.isLoading=isLoading)
  }

  save(){
    if(this.walletForm.invalid) return;
    const wallet = {
      uid: uidv4() ,
      ...this.walletForm.value
    };
      console.log(wallet)
      this.walletForm.reset()
    this.wallet.createWallteItem(wallet)

  }

}
