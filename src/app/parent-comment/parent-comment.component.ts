import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/Comment';

@Component({
  selector: 'app-parent-comment',
  templateUrl: './parent-comment.component.html',
  styleUrls: ['./parent-comment.component.scss'],
})
export class ParentCommentComponent implements OnInit {
  @Input() parentComment: Comment;
  isOpen = true;
  hasChildren: boolean;

  constructor() {}

  ngOnInit() {
    this.hasChildren = this.parentComment?.children?.length > 0;
  }
}
