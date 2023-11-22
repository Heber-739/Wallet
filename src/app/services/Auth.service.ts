import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

import Swal from 'sweetalert2'
import { RegisterUser } from '../interface/registerUser.interface';
import { Firestore, addDoc, collection, doc, setDoc, updateDoc } from '@angular/fire/firestore';


@Injectable({providedIn: 'root'})
export class AuthService {

  private auth:Auth = inject(Auth);
  private fire:Firestore = inject(Firestore);
  private router:Router = inject(Router)

  private token: string | null = null;

  initAuthListener(){
    authState(this.auth).subscribe(res => {
      if(!res) this.token = null;
      res?.getIdToken().then((res)=>this.token = res)
    })
  }

  isAuth(){
    return Boolean(this.token);
  }


  createUser(newUser:RegisterUser){
    const {email,password} = newUser;

    Swal.fire({
      title: "Creando usuario",
      timerProgressBar: true,
      didOpen: () => Swal.showLoading()
    })

    createUserWithEmailAndPassword(this.auth,email,password)
     .then(({user})=>{

    const docRef = doc(this.fire, `user/${user.uid}`);
      setDoc(docRef,newUser).then((res)=>console.log({res}))

      this.loginUser(email,password)
    })
    .catch((err)=>Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.message,
    }).then(()=>Swal.close()))
  }


  loginUser(email:string,password:string){

    Swal.fire({
      title: "Iniciando sesion",
      timerProgressBar: true,
      didOpen: () => Swal.showLoading()
    })

    signInWithEmailAndPassword(this.auth,email,password)
        .then((res)=>{
         Swal.close()
         this.router.navigate(['/'])
       })
       .catch((err)=>Swal.fire({
         icon: "error",
         title: "Oops...",
         text: err.message,
        }).then(()=>Swal.close()))
  }


  logout(){
    signOut(this.auth).then(()=>{
      Swal.fire({
        icon: "success",
        title: "Sesion cerrada",
        timer:1500,
      })
      this.router.navigate(['/login'])
    })
  }
}
