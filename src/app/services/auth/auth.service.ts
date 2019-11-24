import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public server = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  //Service method to login
  login(loginProvider) {
    console.log('loginProvider', loginProvider);
    return this.http.get(this.server + loginProvider);
  }
}
