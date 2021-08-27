import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ActionSheetController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalMenuService {
  actionSheet: HTMLIonActionSheetElement;

  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private authService: AuthService
  ) {}

  async displayMenu() {
    this.actionSheet = await this.actionSheetController.create({
      header: 'Settings',
      buttons: [
        {
          text: 'View Favourites',
          icon: 'heart',
          handler: () => {
            this.router.navigateByUrl('/likes');
          },
        },
        {
          text: 'Logout',
          icon: 'log-out-outline',
          handler: async () => {
            // TODO: make promise
            await this.authService.logout();
            this.router.navigateByUrl('/');
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });

    await this.actionSheet.present();
  }
}
