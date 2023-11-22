import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  private auth = inject(AuthService);
  ngOnInit() {
  }


  logout(){
    this.auth.logout()
  }



}
