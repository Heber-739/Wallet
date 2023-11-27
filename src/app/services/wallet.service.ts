import { Injectable, inject } from '@angular/core';
import { Firestore, Unsubscribe, collection, deleteDoc, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { AuthService } from './Auth.service';
import { Wallet } from '../interface/wallet.interface';

import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../shared/ngrx/app.reducer';
import { isLoading, stopLoading } from '../shared/ngrx/ui/ui.actions';
import { setItems } from '../shared/ngrx/wallet/wallet.actions';


@Injectable({providedIn: 'root'})
export class WalletService {

  private fire:Firestore = inject(Firestore)
  private auth:AuthService = inject(AuthService);
  private uiStore:Store<AppState> = inject(Store<AppState>);
  private walletSubscription!:Unsubscribe;


  createWallteItem(item:Wallet){
    this.uiStore.dispatch(isLoading())
    const uid = this.auth.userUid
    let docRef = doc(this.fire,`user/${uid}/wallet/${item.uid}`)
    setDoc(docRef,item).then(()=>{
      this.uiStore.dispatch(stopLoading())
      Swal.fire({
      icon:'success',
      title:'Registro Guardado',
      timer:1500
    })}).catch((err) => {
      this.uiStore.dispatch(stopLoading())
      Swal.fire({icon:'error',text:err})})
  }


  getWalletData(){
    let uid = this.auth.userUid
    let colRef = collection(this.fire, `user/${uid}/wallet`)

    this.walletSubscription = onSnapshot(colRef,(snapshot)=>{
      const snap = snapshot.docs.map((a)=> a.data() as Wallet)
      console.log(snap);
      this.uiStore.dispatch(setItems({items:snap}))
    })
  }

  deleteItem(uid:string){
    let userUid = this.auth.userUid
    let docRef = doc(this.fire,`user/${userUid}/wallet/${uid}`)
    deleteDoc(docRef).then(()=> Swal.fire({icon:'success',title:'Item eliminado',timer:1000}) )
  }

  unsuscribe(){
    this.walletSubscription()
  }

}
