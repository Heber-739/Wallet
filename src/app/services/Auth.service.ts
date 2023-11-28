import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

import Swal from 'sweetalert2'
import { User } from '../interface/user.interface';
import {  Firestore, Unsubscribe, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { AppState } from '../shared/ngrx/app.reducer';
import { Store } from '@ngrx/store';

import * as ui from './../shared/ngrx/ui/ui.actions';
import { setUser,unSetUser } from '../shared/ngrx/auth/auth.action';
import { unSetItems } from '../shared/ngrx/wallet/wallet.actions';


@Injectable({providedIn: 'root'})
export class AuthService {

  private auth:Auth = inject(Auth);
  private fire:Firestore = inject(Firestore);
  private router:Router = inject(Router)
  private uiStore:Store<AppState> = inject(Store<AppState>);
  private userSubscription!:Unsubscribe;
  private token: string | null = null;
  private _userUid:string = '';

  initAuthListener(){
    authState(this.auth).subscribe(res => {
      if(!res) {
        this._userUid = '';
        this.token = null
        this.uiStore.dispatch(unSetUser())
        this.uiStore.dispatch(unSetItems())
        if(this.userSubscription) this.userSubscription()
        this.router.navigate(['/login'])
      } else {
        this._userUid = res.uid;
        res.getIdToken().then((res)=>{
          this.token = res;
          this.router.navigate(['/dashboard'])
          })
        let userDoc = doc(this.fire,`user/${res.uid}`)

        this.userSubscription = onSnapshot(userDoc, (snapshot) =>
        this.uiStore.dispatch(setUser({user:snapshot.data() as User})))

      }
    })
  }

  isAuth(){
    return Boolean(this.token);
  }

  get userUid(){
    return this._userUid
  }

  createUser(newUser:User){
    const {email,password} = newUser;
    this.uiStore.dispatch(ui.isLoading())


    createUserWithEmailAndPassword(this.auth,email,password)
     .then(({user})=>{

    const docRef = doc(this.fire, `user/${user.uid}`);
      setDoc(docRef,newUser).then((res)=>console.log({res}))

      this.loginUser(email,password)
      this.uiStore.dispatch(ui.stopLoading())
    })
    .catch((err)=>Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.message,
    }))
  }


  loginUser(email:string,password:string){

    this.uiStore.dispatch(ui.isLoading())

    signInWithEmailAndPassword(this.auth,email,password)
        .then(()=> this.uiStore.dispatch(ui.stopLoading()))
       .catch((err)=>{
        this.uiStore.dispatch(ui.stopLoading());
        Swal.fire({
         icon: "error",
         title: "Oops...",
         text: err.message,
        }).then(()=>Swal.close()
      )})
  }


  logout(){
    signOut(this.auth).then(()=>{
      Swal.fire({
        icon: "success",
        title: "Sesion cerrada",
        timer:1500,
      })
    })
  }
}
