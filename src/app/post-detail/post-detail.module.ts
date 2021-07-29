import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostDetailPage } from './post-detail.page';

import { IonicModule } from '@ionic/angular';

import { PostDetailPageRoutingModule } from './post-detail-routing.module';
import { CommentComponent } from '../comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostDetailPageRoutingModule,
  ],
  declarations: [PostDetailPage, CommentComponent],
})
export class PostDetailPageModule {}
