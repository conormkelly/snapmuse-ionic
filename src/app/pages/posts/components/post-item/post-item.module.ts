import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../../shared/shared.module';

import { PostItemComponent } from './post-item.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, SharedModule],
  declarations: [PostItemComponent],
  exports: [PostItemComponent],
})
export class PostItemComponentModule {}
