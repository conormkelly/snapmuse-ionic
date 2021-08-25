import { Component, OnDestroy, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { SongDetailComponent } from '../song-detail/song-detail.component';

import { Subscription } from 'rxjs';
import { AudioService, AudioState } from '../services/audio.service';

import { Comment } from '../models/Comment';
import { Post } from '../models/Post';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  public audio$: Subscription;
  public audio: HTMLAudioElement;
  public comment: Comment;
  public post: Post;
  public playbackState: AudioState;

  constructor(
    private modalService: ModalController,
    private router: Router,
    private audioService: AudioService,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.audio$ = this.audioService
      .getAudioSubscription()
      .subscribe((audioData) => {
        this.playbackState = audioData.state;
        this.audio = audioData.audio;
        this.comment = audioData.comment;
        this.post = audioData.post;
      });
  }

  onPlay() {
    this.audioService.play(this.comment);
  }

  onPause() {
    this.audioService.pause(this.comment);
  }

  async onToggleLike() {
    const originalValue = this.comment.isLiked;

    try {
      this.comment.isLiked = !originalValue;

      await this.postsService.likeComment({
        commentId: this.comment.id,
        postId: this.comment.postId,
        isLiked: this.comment.isLiked,
      });
    } catch (err) {
      console.log('An error occurred!');
      this.comment.isLiked = originalValue;
    }
  }

  onClickThumbnail() {
    const postDetailUrl = `/posts/${this.post.id}`;
    if (this.router.url !== postDetailUrl) {
      this.router.navigateByUrl(postDetailUrl);
    }
  }

  ngOnDestroy() {
    this.audio$.unsubscribe();
  }

  async onPresentModal() {
    const modal = await this.modalService.create({
      component: SongDetailComponent,
    });
    return await modal.present();
  }
}
