import { Component, OnDestroy, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { AudioService, AudioState } from '../services/audio.service';

import { Comment } from '../models/Comment';
import { Post } from '../models/Post';
import { Router } from '@angular/router';
import { LikesService } from '../services/likes.service';

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
    private likesService: LikesService
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

      await this.likesService.setIsLiked({
        commentId: this.comment.id,
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
}
