import { AuthService } from 'src/app/services/Auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/shared/ngrx/app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  private uiLoadingSub: Subscription;
  isLoading!:boolean;
  private uiStore:Store<AppState> = inject(Store<AppState>);

  constructor(private fb:FormBuilder,
    private authService:AuthService) {
      this.uiLoadingSub = this.uiStore.select('ui')
    .subscribe(({isLoading})=>this.isLoading = isLoading)
    }

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
