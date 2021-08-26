import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostDetailPage } from './post-detail.page';

import { IonicModule } from '@ionic/angular';

import { PostDetailPageRoutingModule } from './post-detail-routing.module';
import { ParentCommentComponent } from './components/parent-comment/parent-comment.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [PostDetailPage, ParentCommentComponent],
})
export class PostDetailPageModule {}
