/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../models/Post';
import { Comment } from '../../../models/Comment';
import { GlobalMenuService } from '../../../services/global-menu.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {
  public post: Post;
  public comments: Comment[] = [];
  isLoading = false;

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    public globalMenuService: GlobalMenuService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  async loadComments() {
    try {
      this.isLoading = true;

      if (!this.post) {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.post = await this.postsService.getPostById(id);
      }
      const response = await this.postsService.getComments(this.post.id);
      this.isLoading = false;
      this.comments = response.data;
    } catch (err) {
      this.isLoading = false;
      const toast = await this.toastController.create({
        message: err?.error.message
          ? err.error.message
          : 'Something went wrong. Please try again.',
        duration: 3000,
        color: 'danger',
      });
      toast.present();
    }
  }

  onCommentAdded(comment: Comment) {
    this.loadComments();
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
    this.comments.push(comment);
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Posts' : '';
  }
}
