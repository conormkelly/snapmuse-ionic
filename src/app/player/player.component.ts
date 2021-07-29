import { Component, OnDestroy, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { SongDetailComponent } from '../song-detail/song-detail.component';

import { Subscription } from 'rxjs';
import { AudioService } from '../services/audio.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  public audio: HTMLAudioElement;
  public user: string;
  public title: string;
  public audio$: Subscription;
  public isPlaying = false;
  public isLiked = false;

  constructor(
    private modalService: ModalController,
    private data: DataService,
    private audioService: AudioService
  ) {}

  ngOnInit() {
    this.audio$ = this.audioService
      .getAudioSubscription()
      .subscribe((audioData) => {
        this.audio = audioData.audio;
        this.user = audioData.user;
        this.title = audioData.title;
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
