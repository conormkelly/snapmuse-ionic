import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/Comment';
import { LikesService } from 'src/app/services/likes.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.page.html',
  styleUrls: ['./likes.page.scss'],
})
export class LikesPage {
  isLoading = true;
  likedComments: Comment[] = [];

  constructor(private likesService: LikesService) {}

  async ionViewDidEnter() {
    // Make the API call
    try {
      const res = await this.likesService.getAllUserLikes();
      this.likedComments = res.data;
    } catch (err) {
      console.log('Error loading comments', err);
    }
    this.isLoading = false;
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Back' : '';
  }
}
