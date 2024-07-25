import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000';
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private httpClient: HttpClient){}

  login(data: any) {

    return this.httpClient.get(`${this.baseUrl}/users`)
      .pipe(map((result:any) => {
       console.log(result)
        let user = result.find((x: { userName: any; password: any; }) => x.userName === data.userName && x.password === data.password)
        if(user != null || undefined){
            localStorage.setItem('authUser', JSON.stringify(user));
        }
        return user;
      }));
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  logout() {
    localStorage.removeItem('authUser');
  }
}
