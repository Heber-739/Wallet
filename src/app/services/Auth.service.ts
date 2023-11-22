import { Injectable, inject } from '@angular/core';
import { RegisterUser } from '../interface/registerUser.interface';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {

  private auth:Auth = inject(Auth);
  private router:Router = inject(Router)


  createUser(user:RegisterUser){
    const {email,password} = user;
     createUserWithEmailAndPassword(this.auth,email,password)
     .then((res)=>{
      console.log({'res':res});
      this.router.navigate(['/'])
    })
    .catch((err)=>console.error(err))
  }

  loginUser(email:string,password:string){
     signInWithEmailAndPassword(this.auth,email,password)
     .then((res)=>{
      console.log({'res':res});
      this.router.navigate(['/'])
    })
    .catch((err)=>console.error(err))
  }

}
