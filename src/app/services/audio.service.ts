/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

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

  constructor(private postsService: PostsService, private http: HttpClient) {}

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

  downloadFile(commentId): Observable<any> {
    // TODO: fix hardcoded url - this is only working right now because
    // the backend is not verifying the post id, just commentId
    const url = `http://localhost:3000/posts/123/comments/${commentId}/audio`;
    return this.http.get(url, {
      responseType: 'blob',
      headers: {
        'Content-Disposition': 'attachment',
      },
    });
  }

  public getAudioSubscription(): Observable<AudioData> {
    return this.audioSubject.asObservable();
  }
}
