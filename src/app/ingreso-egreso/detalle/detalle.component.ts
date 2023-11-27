import { WalletService } from './../../services/wallet.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Wallet } from 'src/app/interface/wallet.interface';
import { AppState } from 'src/app/shared/ngrx/app.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  walletItems:Wallet[] = [];
  private store:Store<AppState> = inject(Store<AppState>);
  private walletService:WalletService = inject(WalletService);
  private storeSubs!: Subscription;
  order:string = 'asc';


  constructor() { }

  ngOnDestroy(): void {
    this.storeSubs.unsubscribe()
  }

  ngOnInit() {
    this.getItems()
  }

  private getItems(){
    this.storeSubs = this.store.select('wallet').subscribe(({items})=>
   { console.log(items)
      this.walletItems = items})
  }
  toogleOrder(){
    this.order = this.order==='asc'?'des':'asc'
  }

  deleteItem(uid:string){
    this.walletService.deleteItem(uid);

  }
}
