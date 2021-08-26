import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikedPageRoutingModule } from './likes-routing.module';

import { LikesPage } from './likes.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikedPageRoutingModule,
    SharedModule,
  ],
  declarations: [LikesPage],
})
export class LikesPageModule {}
