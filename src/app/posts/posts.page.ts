import { Component } from '@angular/core';
import { DataService, Post } from '../services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.page.html',
  styleUrls: ['posts.page.scss'],
})
export class PostsPage {
  constructor(private data: DataService) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getPosts(): Post[] {
    return this.data.getPosts();
  }

}
