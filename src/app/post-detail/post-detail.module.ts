import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostDetailPage } from './post-detail.page';

import { IonicModule } from '@ionic/angular';

import { PostDetailPageRoutingModule } from './post-detail-routing.module';
import { CommentComponent } from '../comment/comment.component';
import { AddCommentComponent } from '../components/add-comment/add-comment.component';
import { ParentCommentComponent } from '../parent-comment/parent-comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostDetailPageRoutingModule,
  ],
  declarations: [
    PostDetailPage,
    CommentComponent,
    AddCommentComponent,
    ParentCommentComponent,
  ],
})
export class PostDetailPageModule {}
