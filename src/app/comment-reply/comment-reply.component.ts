import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comment } from '../models/Comment';

@Component({
  selector: 'app-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss'],
})
export class CommentReplyComponent implements OnInit {
  @Input() originalComment: Comment;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalController.dismiss();
  }

  onAddComment(newComment: Comment) {
    this.modalController.dismiss({ comment: newComment });
  }
}
