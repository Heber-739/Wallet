import { AuthService } from 'src/app/services/Auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  constructor(private fb:FormBuilder,
    private authService:AuthService) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  login(){
    const {email,password} = this.loginForm.value;
    this.authService.loginUser(email,password)
  }

}
