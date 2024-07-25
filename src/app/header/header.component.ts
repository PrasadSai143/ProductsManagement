import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) {

    setTimeout(() => {
      if (this.isUserLoggedIn) {
        if (this.authService.isLoggedIn()) {
          this.isUserLoggedIn = true;
        }
      }
    }, 1000);
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isUserLoggedIn = true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
    this.isUserLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
