import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.BASE_URL}user`;
  public user: BehaviorSubject<User> =
    new BehaviorSubject<User>(new User('','','','','','', false));
  users = [
    {
      id: 123,
      userName: 'testcustomer',
      password: '123456789',
      isVendorUser: 0,
    },
    {
      id: 1234,
      userName: 'testvendor',
      password: '123456789',
      isVendorUser: 1,
    },
  ];

  constructor(private httpClient: HttpClient) {}

  login(data: any) {
    const encodeuser = btoa(JSON.stringify(data));
    let headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'X-AUTH': `Basic ${encodeuser}`
    }
    const requestOptions = {headers: new HttpHeaders(headerDict)};
    return this.httpClient.post(`${this.baseUrl}/login`,null,requestOptions)
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  getUser(){
    return JSON.stringify(localStorage.getItem('user'));
  }

  getToken(){
    return JSON.stringify(localStorage.getItem('token'));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
