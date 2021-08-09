import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  @Input() post: Post;
  @Output() commentAdded = new EventEmitter<Comment>();

  commentText = '';
  selectedFile: File = null;

  constructor(private postsService: PostsService) {}

  ngOnInit() {}

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

  onDeleteAttachment() {
    this.selectedFile = null;
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
        this.commentAdded.emit(response.data);
      });
  }
}
