import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  private walletService:WalletService = inject(WalletService);


  ngOnInit() {
    this.getWalletData()
  }
  ngOnDestroy(): void {
   this.walletService.unsuscribe()
  }

  private getWalletData(){
    this.walletService.getWalletData()
  }
}
