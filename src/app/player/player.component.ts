import { saveAs } from 'file-saver';

import { ToastController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Comment } from '../models/Comment';
import { Post } from '../models/Post';

import { AudioService, AudioState } from '../services/audio.service';
import { LikesService } from '../services/likes.service';
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
  downloadState = 'none';
  public audioTime = 0;
  public audioLength;

  constructor(
    private router: Router,
    private audioService: AudioService,
    private postsService: PostsService,
    private likesService: LikesService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.audio$ = this.audioService
      .getAudioSubscription()
      .subscribe((audioData) => {
        this.playbackState = audioData.state;
        this.audio = audioData.audio;
        this.comment = audioData.comment;
        this.post = audioData.post;
        this.audioLength = this.audio.duration;

        this.audio.ontimeupdate = () => {
          this.audioTime = this.audio.currentTime;
        };
      });
  }

  onPlay() {
    this.audioService.play(this.comment);
  }

  onPause() {
    this.audioService.pause(this.comment);
  }

  async onDownload() {
    try {
      if (this.downloadState === 'none') {
        const post = await this.postsService.getPostById(this.comment.postId);
        this.downloadState = 'inProgress';
        const blob = await this.audioService.downloadFile(this.comment.id);
        this.downloadState = 'complete';
        saveAs(
          blob,
          `${post.title}-${this.comment.username}.mp3`.toLocaleLowerCase()
        );
      }
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
