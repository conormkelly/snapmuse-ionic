import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  @Input() postId: string;
  @Input() parentId: string;
  @Output() commentAdded = new EventEmitter<any>();

  commentText = '';
  selectedFile: File = null;

  constructor(
    private postsService: PostsService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  isSendDisabled() {
    const hasValidCommentText =
      (this.commentText.length === 0 && this.selectedFile !== null) ||
      (this.commentText.length >= 2 && this.commentText.length <= 280);

    return !hasValidCommentText;
  }

  onSelectFile(ev) {
    if (ev?.target?.files?.length === 1) {
      this.selectedFile = ev.target.files[0];
    }
  }

  onDeleteAttachment() {
    this.selectedFile = null;
  }

  async onAddComment() {
    try {
      const res = await this.postsService.addComment({
        audioFile: this.selectedFile,
        text: this.commentText,
        postId: this.postId,
        parentId: this.parentId,
      });
      this.selectedFile = null;
      this.commentText = '';
      this.commentAdded.emit(res.data);
    } catch (errRes) {
      const toast = await this.toastController.create({
        message: errRes?.error.message
          ? errRes.error.message
          : 'Something went wrong. Please try again.',
        duration: 3000,
        color: 'danger',
      });
      toast.present();
    }
  }
}
