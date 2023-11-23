import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/services/Auth.service';
import { AppState } from 'src/app/shared/ngrx/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!:FormGroup;

   private uiLoadingSub: Subscription;
  isLoading!:boolean;
  private uiStore:Store<AppState> = inject(Store<AppState>);


  constructor(private fb:FormBuilder,
    private authService:AuthService) {
       this.uiLoadingSub = this.uiStore.select('ui')
    .subscribe(({isLoading})=>this.isLoading = isLoading)
    }
  ngOnDestroy(): void {
    this.uiLoadingSub.unsubscribe()
  }

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
    if(this.registerForm.invalid) return;
    else {
      const newUser:User = this.registerForm.value;
      this.authService.createUser(newUser)
    }
  }

}
