import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn = false;
  productRouter = '/product/productlist';
  homeRouter = '/home';
  username: any;
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isUserLoggedIn = true;
      const user = JSON.parse(localStorage.getItem('user') ?? 'null')
      this.username = user.userName;
      this.router.navigate(['/product/productlist']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.authService.logout();
    this.isUserLoggedIn = false;
    this.router.navigate(['/home']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe((data: any) => {
        let user = data.data.user;
        let token = data.data.token.access_token;
        if ((user != null || undefined) && (token != null || undefined)) {
          console.log(user);
          this.isUserLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(token));
        }
        this.router.navigate(['/product/productlist']);
      });

      if (this.authService.login(this.loginForm.value) != undefined || null) {
        this.router.navigate(['/product/productlist']);
      }
    }
  }
}
