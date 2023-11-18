import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;


  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  private initForm(){
    this.registerForm = this.fb.group({
      nombre:   ['',Validators.required],
      correo:   ['',[Validators.required,Validators.email]],
      password:   ['',Validators.required],
    })
  }


  register(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched()
    } else {
      console.log(this.registerForm.value)
    }
  }

}
