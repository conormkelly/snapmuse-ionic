import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthValidator } from './password.validator';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isRegistering = false;
  userDetails: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const action = this.activatedRoute.snapshot.paramMap.get('action');

    if (action === 'register') {
      this.isRegistering = true;
    } else if (action === 'login') {
      this.isRegistering = false;
    } else {
      this.router.navigateByUrl('/');
    }

    if (this.isRegistering) {
      this.userDetails = this.formBuilder.group({
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.pattern('^[a-z0-9_-]*$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            AuthValidator.password,
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            AuthValidator.password,
            AuthValidator.matchValue('password'),
          ],
        ],
      });
    } else {
      this.userDetails = this.formBuilder.group({
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.pattern('^[a-z0-9_-]*$'),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            AuthValidator.password,
          ],
        ],
      });
    }
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Home' : '';
  }

  onSubmit() {
    if (this.isRegistering) {
      this.onRegister();
    } else {
      this.onLogin();
    }
  }

  onRegister() {
    this.authService.register(this.userDetails.value).subscribe((response) => {
      console.log(response);
      if (response.status !== 401) {
        this.router.navigateByUrl('/posts');
      } else {
        console.log('ERROR REGISTERING!');
      }
    });
  }

  onLogin() {
    this.authService.login(this.userDetails.value).subscribe((response) => {
      console.log(response);
      if (response.status !== 401) {
        this.router.navigateByUrl('/posts');
      } else {
        console.log('ERROR LOGGING IN!');
      }
    });
  }
}
