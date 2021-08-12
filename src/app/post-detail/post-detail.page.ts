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

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  async loadComments() {
    if (!this.post) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.post = await this.postsService.getPostById(id);
    }
    const response = await this.postsService.getComments(this.post.id);
    this.comments = response.data;
  }

  async refresh(ev) {
    await this.loadComments();
    ev.detail.complete();
  }

  /**
   * Adds the comment emitted by the
   * child `app-add-comment` component.
   */
  onAddComment(comment: Comment) {
    // TODO: handle pushing it to correct place
    this.comments.push(comment);
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
