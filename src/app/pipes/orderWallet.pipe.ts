import { Pipe, PipeTransform } from '@angular/core';
import { Wallet } from '../interface/wallet.interface';

@Pipe({
  name: 'orderWallet'
})

export class OrderWalletPipe implements PipeTransform {
  transform(items: Wallet[], ord:string): Wallet[] {
    let itemsTransform = [...items]
    if(ord === 'asc') return itemsTransform.sort((a)=> a.type === 'INCOME' ? 1:-1)
    return itemsTransform.sort((a)=> a.type === 'INCOME' ? -1:1)
  }
}
