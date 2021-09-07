import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { CommentComponent } from './components/comment/comment.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';

import { DurationPipe } from '../pipes/duration.pipe';

@NgModule({
  declarations: [CommentComponent, AddCommentComponent, DurationPipe],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [CommentComponent, AddCommentComponent, DurationPipe, FormsModule],
})
export class SharedModule {}
