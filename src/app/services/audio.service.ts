import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export enum AudioState {
  playing = 'Playing',
  paused = 'Paused',
  stopped = 'Stopped',
}

export interface AudioData {
  audio: HTMLAudioElement;
  user: string;
  title: string;
  url: string;
  state: AudioState;
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  public audio: HTMLAudioElement;

  public audioSubject: Subject<AudioData> = new Subject();

  constructor() {}

  public loadAudio({ url, user, title }) {
    if (!this.audio) {
      this.audio = new Audio();
    }
    if (this.audio.src !== url) {
      this.audio.src = url;
      this.audio.onloadeddata = () => {
        this.audioSubject.next({
          audio: this.audio,
          user,
          title,
          url,
          state: AudioState.playing,
        });
        this.audio.play();
      };
      this.audio.load();
    }
  }

  public getAudioSubscription(): Observable<AudioData> {
    return this.audioSubject.asObservable();
  }
}
