import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AudioService, AudioState } from './services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  $audio: Subscription;
  hasCommentLoaded = false;

  constructor(private audioService: AudioService) {
    this.$audio = this.audioService
      .getAudioSubscription()
      .subscribe(() => {
        this.hasCommentLoaded = true;
      });
  }

  ngOnDestroy() {
    this.$audio.unsubscribe();
  }
}
