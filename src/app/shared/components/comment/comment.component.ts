import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Comment } from '../../../models/Comment';

import { CommentReplyComponent } from '../../../pages/posts/post-detail/components/comment-reply/comment-reply.component';

import { AudioService } from '../../../services/audio.service';
import { LikesService } from 'src/app/services/likes.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() isReplying: boolean;
  @Output() commentAdded = new EventEmitter<Comment>();
  isOnUserLikesPage = false;

  constructor(
    private audioService: AudioService,
    private likesService: LikesService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.isOnUserLikesPage = this.router.url === '/likes';
  }

  onPlay() {
    if (this.comment.recordingSrc) {
      this.audioService.play(this.comment);
    }
  }

  async onToggleLike() {
    const originalValue = this.comment.isLiked;

    try {
      this.comment.isLiked = !originalValue;

      await this.likesService.setIsLiked({
        commentId: this.comment.id,
        isLiked: this.comment.isLiked,
      });
    } catch (err) {
      console.log('An error occurred!');
      this.comment.isLiked = originalValue;
    }
  }

  async onReply() {
    const modal = await this.modalController.create({
      component: CommentReplyComponent,
      componentProps: {
        originalComment: this.comment,
      },
    });
    await modal.present();

    // pass back commentAdded action to parent
    const { data } = await modal.onWillDismiss();
    if (data && data.comment) {
      this.commentAdded.emit(data.comment);
    }
  }

  isPlaying() {
    return (
      this.audioService.audio &&
      this.comment.recordingSrc === this.audioService.audio.src
    );
  }
}
