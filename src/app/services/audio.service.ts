/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Post } from '../models/Post';
import { Comment } from '../models/Comment';

import { PostsService } from './posts.service';
import { environment } from 'src/environments/environment';

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

  public audioSubject: Subject<AudioData | null> = new Subject();

  constructor(private postsService: PostsService, private http: HttpClient) {}

  public async play(comment: Comment) {
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

      this.audio.onended = () => {
        this.audioSubject.next({
          audio: this.audio,
          comment,
          post,
          state: AudioState.paused,
        });
      };

      this.audio.load();
    } else {
      this.audio.play();
      this.audioSubject.next({
        audio: this.audio,
        comment,
        post,
        state: AudioState.playing,
      });
    }
  }

  async pause(comment) {
    const post = await this.postsService.getPostById(comment.postId);

    if (this.audio) {
      this.audio.pause();
      this.audioSubject.next({
        audio: this.audio,
        comment,
        post,
        state: AudioState.paused,
      });
    }
  }

  downloadFile(commentId) {
    const url = `${environment.apiBaseUrl}/audio/${commentId}`;
    return this.http
      .get(url, {
        responseType: 'blob',
        headers: {
          'Content-Disposition': 'attachment',
        },
      })
      .toPromise();
  }

  public getAudioSubscription(): Observable<AudioData> {
    return this.audioSubject.asObservable();
  }
}
