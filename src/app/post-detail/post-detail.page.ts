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
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.postsService.getPostById(id).then((post) => {
      this.post = post;

      if (post) {
        this.postsService.getComments(id).then((response) => {
          // TODO: fixme - temp for testing purposes
          const tempComments = response.data;

          if (tempComments.length > 3) {
            const tempChild1 = tempComments.pop();
            const tempChild2 = tempComments.pop();
            tempChild1.parentId = tempComments[0].id;
            tempChild2.parentId = tempComments[0].id;
            tempComments[0].children = [tempChild1, tempChild2];
          }

          this.comments = tempComments;
        });
      }
    });
  }

  /**
   * Adds the comment emitted by the
   * child `app-add-comment` component.
   */
  onAddComment(comment: Comment) {
    this.comments.unshift(comment);
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }
}
