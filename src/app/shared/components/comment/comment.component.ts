import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AudioService } from '../../../services/audio.service';

import { PostsService } from '../../../services/posts.service';
import { Comment } from '../../../models/Comment';

import { saveAs } from 'file-saver';
import { ModalController } from '@ionic/angular';
import { CommentReplyComponent } from '../../../pages/posts/post-detail/components/comment-reply/comment-reply.component';
import { LikesService } from 'src/app/services/likes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() isReplying: boolean;
  @Output() commentAdded = new EventEmitter<Comment>();

  downloadState = 'none';

  constructor(
    private audioService: AudioService,
    private postsService: PostsService,
    private likesService: LikesService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {}

  onPlay() {
    if (this.comment.recordingSrc) {
      this.audioService.play(this.comment);
    }
  }

  async onDownload() {
    if (this.downloadState === 'none') {
      const post = await this.postsService.getPostById(this.comment.postId);
      this.downloadState = 'inProgress';
      this.audioService.downloadFile(this.comment.id).subscribe((blob) => {
        this.downloadState = 'complete';
        saveAs(blob, `${post.title}-${this.comment.username}.mp3`);
      });
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

  async onToggleLiked() {
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

  isPlaying() {
    return (
      this.audioService.audio &&
      this.comment.recordingSrc === this.audioService.audio.src
    );
  }

  isOnUserLikesPage() {
    return this.router.url === '/likes';
  }
}