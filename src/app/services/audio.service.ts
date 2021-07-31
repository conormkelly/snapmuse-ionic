import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Post } from '../models/Post';
import { Comment } from '../models/Comment';

import { PostsService } from './posts.service';

export enum AudioState {
  playing = 'Playing',
  paused = 'Paused',
  stopped = 'Stopped',
}

export interface AudioData {
  audio: HTMLAudioElement;
  post: Post;
  comment: Comment;
  state: AudioState;
}

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  public audio: HTMLAudioElement;

  public audioSubject: Subject<AudioData> = new Subject();

  constructor(private postsService: PostsService) {}

  public async loadAudio(comment: Comment) {
    if (!this.audio) {
      this.audio = new Audio();
    }

    const post = await this.postsService.getPostById(comment.postId);

    if (this.audio.src !== comment.recordingSrc) {
      this.audio.src = comment.recordingSrc;
      this.audio.onloadeddata = () => {
        this.audioSubject.next({
          audio: this.audio,
          comment,
          post,
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
