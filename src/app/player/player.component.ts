/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { SongDetailComponent } from '../song-detail/song-detail.component';

import { Subscription } from 'rxjs';
import { AudioService } from '../services/audio.service';

import { Comment } from '../models/Comment';
import { Post } from '../models/Post';
import { Router } from '@angular/router';

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
  public isPlaying = false;
  public isLiked = false;

  constructor(
    private modalService: ModalController,
    private router: Router,
    private audioService: AudioService
  ) {}

  ngOnInit() {
    this.audio$ = this.audioService
      .getAudioSubscription()
      .subscribe((audioData) => {
        this.audio = audioData.audio;
        this.comment = audioData.comment;
        this.post = audioData.post;
        this.isPlaying = true;
      });
  }

  onPlay() {
    this.audio.play();
    this.isPlaying = true;
  }

  onPause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  onToggleLike() {
    this.isLiked = !this.isLiked;
  }

  onClickThumbnail() {
    const postDetailUrl = `/posts/${this.post._id}`;
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
