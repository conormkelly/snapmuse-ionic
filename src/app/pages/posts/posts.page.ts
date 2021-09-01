import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/Post';
import { GlobalMenuService } from '../../services/global-menu.service';

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.page.html',
  styleUrls: ['posts.page.scss'],
})
export class PostsPage implements OnInit, OnDestroy {
  posts: Post[] = [];
  private $postSubscription: Subscription;

  constructor(
    private postsService: PostsService,
    public globalMenuService: GlobalMenuService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.$postSubscription = this.postsService.getPostsListener().subscribe(
      (posts) => {
        this.posts = posts;
      },
      async (err) => {
        const toast = await this.toastController.create({
          message: err?.error.message
            ? err.error.message
            : 'Something went wrong. Please try again.',
          duration: 3000,
          color: 'danger',
        });
        toast.present();
      }
    );
    this.postsService.getAllPosts();
  }

  ngOnDestroy() {
    this.$postSubscription.unsubscribe();
  }

  async refresh(ev) {
    try {
      await this.postsService.getAllPosts();
    } catch (err) {
      console.log('Error refreshing.');
    }
    ev.detail.complete();
  }
}
