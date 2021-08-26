import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../../../../models/Comment';

@Component({
  selector: 'app-parent-comment',
  templateUrl: './parent-comment.component.html',
  styleUrls: ['./parent-comment.component.scss'],
})
export class ParentCommentComponent implements OnInit {
  @Input() parentComment: Comment;
  @Output() commentAdded = new EventEmitter<Comment>();

  isOpen = true;
  hasChildren: boolean;

  constructor() {}

  ngOnInit() {
    this.hasChildren = this.parentComment?.children?.length > 0;
  }

  onCommentAdded(ev) {
    this.commentAdded.emit(ev);
  }
}
