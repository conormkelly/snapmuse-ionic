import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    this.authService
      .login({
        username: 'test',
        password: 'test',
      })
      .subscribe((result: any) => {
        if (result.success) {
          this.router.navigateByUrl('/posts');
        } else {
          console.error(result.message);
        }
      });
  }

  onRegister() {
    console.log('TODO: Register clicked!');
  }
}
