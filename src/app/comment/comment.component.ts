import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from '../services/audio.service';

import { PostsService } from '../services/posts.service';
import { Comment } from '../models/Comment';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  downloadState = 'none';

  constructor(
    private audioService: AudioService,
    private postsService: PostsService
  ) {}

  ngOnInit() {}

  onPlay() {
    this.audioService.loadAudio(this.comment);
  }

  async onDownload() {
    if (this.downloadState === 'none') {
      const post = await this.postsService.getPostById(this.comment.postId);
      this.downloadState = 'inProgress';
      this.audioService.downloadFile(this.comment.id).subscribe((blob) => {
        this.downloadState = 'complete';
        saveAs(blob, `${post.title}-${this.comment.user.username}.mp3`);
      });
    }
  }

  isPlaying() {
    return (
      this.audioService.audio &&
      this.comment.recordingSrc === this.audioService.audio.src
    );
  }
}
