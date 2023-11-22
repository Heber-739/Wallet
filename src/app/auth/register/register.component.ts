import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/interface/registerUser.interface';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;


  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm(){
    this.registerForm = this.fb.group({
      name:   ['',[Validators.required]],
      email:   ['',[Validators.required,Validators.email]],
      password:   ['',[Validators.required]],
    })
  }


  register(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched()
      console.log('error')
    } else {
      console.log('paso')
      const newUser:RegisterUser = this.registerForm.value;
      this.authService.createUser(newUser)
    }
  }

}
