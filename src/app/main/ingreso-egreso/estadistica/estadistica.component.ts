import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData } from 'chart.js';
import { Wallet, WalletType } from 'src/app/interface/wallet.interface';
import { AppWalletState } from 'src/app/shared/ngrx/wallet/wallet.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  income:number=0
  egress:number=0
  totalIncome:number=0
  totalEgress:number=0

  doughnutChartData: ChartData<'doughnut'> | null = null;


  constructor(private store:Store<AppWalletState>) { }

  ngOnInit() {
    this.getData()
  }

  private getData(){
    this.store.select('wallet').subscribe(({items})=>
    this.generate(items))
  }

  generate(items:Wallet[]){

    this.income=0
  this.egress=0
  this.totalIncome=0
  this.totalEgress=0

    items.forEach((item)=>{
      if(item.type===WalletType.INCOME){
        this.totalIncome += item.amount
        this.income++;
      } else {
        this.totalEgress += item.amount
        this.egress++;
      }
    })
    this.showGraphic()
  }
  /*  */

  showGraphic(){
 this.doughnutChartData = {
      labels: ['Ingresos','Egresos'],
      datasets: [
        { data: [this.totalIncome,this.totalEgress] },
      ],
    };
  }

}
