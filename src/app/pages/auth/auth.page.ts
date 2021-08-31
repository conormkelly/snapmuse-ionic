import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthValidator } from './password.validator';

import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController,
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
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9]+$'),
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
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9]+$'),
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

  async onSubmit() {
    try {
      if (this.isRegistering) {
        await this.authService.register(this.userDetails.value);
      } else {
        await this.authService.login(this.userDetails.value);
      }
      this.router.navigateByUrl('/posts');
    } catch (res) {
      const toast = await this.toastController.create({
        message: res?.error.message
          ? res.error.message
          : 'Something went wrong. Please try again.',
        duration: 3000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
