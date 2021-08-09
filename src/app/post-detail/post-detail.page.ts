/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/Post';
import { Comment } from '../models/Comment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {
  public post: Post;
  public comments: Comment[] = [];

  commentText = '';
  selectedFile: File = null;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.postsService.getPostById(id).then((post) => {
      this.post = post;

      if (post) {
        this.postsService.getComments(id).then((response) => {
          this.comments = response.data;
        });
      }
    });
  }

  isSendDisabled() {
    const hasValidCommentText =
      (this.commentText.length === 0 && this.selectedFile !== null) ||
      (this.commentText.length >= 2 && this.commentText.length <= 280);

    return !hasValidCommentText;
  }

  onSelectFile(ev) {
    if (ev?.target?.files?.length === 1) {
      this.selectedFile = ev.target.files[0];
    }
  }

  onAddComment() {
    this.postsService
      .addComment({
        audioFile: this.selectedFile,
        text: this.commentText,
        postId: this.post.id,
      })
      .subscribe((response) => {
        // TODO: Error handling
        this.selectedFile = null;
        this.commentText = '';
        this.comments.unshift(response.data);
      });
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
