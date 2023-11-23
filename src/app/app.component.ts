import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    this.auth.initAuthListener()
  }

  title = 'app';
  private auth = inject(AuthService)

}
