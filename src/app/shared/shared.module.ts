import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { AddCommentComponent } from '../components/add-comment/add-comment.component';

@NgModule({
  declarations: [CommentComponent, AddCommentComponent],
  imports: [CommonModule, BrowserModule, FormsModule, IonicModule],
  exports: [CommentComponent, AddCommentComponent],
})
export class SharedModule {}
