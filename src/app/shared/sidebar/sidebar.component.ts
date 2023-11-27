import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/Auth.service';
import { AppState } from '../ngrx/app.reducer';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  private auth = inject(AuthService);
  private store:Store<AppState> = inject(Store<AppState>);
  private loadingSubs!:Subscription;
  user:User | null = null;

  ngOnInit() {
    this.getUser()
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe()
  }


  getUser(){
    this.loadingSubs =this.store.select('auth')
    .subscribe(({user})=> this.user = user)
  }

  logout(){
    this.auth.logout()
  }



}
