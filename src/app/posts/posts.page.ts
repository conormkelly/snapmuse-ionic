import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.page.html',
  styleUrls: ['posts.page.scss'],
})
export class PostsPage implements OnInit, OnDestroy {
  posts: Post[] = [];
  private $postSubscription: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.$postSubscription = this.postsService
      .getPostsListener()
      .subscribe((posts) => {
        this.posts = posts;
      });
    this.postsService.getAllPosts();
  }

  ngOnDestroy() {
    this.$postSubscription.unsubscribe();
  }

  refresh(ev) {
    this.postsService.getAllPosts().then((wasSuccessful) => {
      ev.detail.complete();
    });
  }
}
