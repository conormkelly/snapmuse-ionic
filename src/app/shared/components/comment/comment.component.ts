import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { CommentReplyComponent } from '../../../pages/posts/post-detail/components/comment-reply/comment-reply.component';
import { AudioService } from '../../../services/audio.service';
import { Comment } from '../../../models/Comment';

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
