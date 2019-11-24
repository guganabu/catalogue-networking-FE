import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  // Method to login into system
  login(loginType) {
    let loginEndpoint = '';
    if (loginType === 'github') {
      loginEndpoint = '/auth/github';
    }
    this.authService.login(loginEndpoint).subscribe((userData) => {
      console.log('userData', userData);
    })
  }

}
