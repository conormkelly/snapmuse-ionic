interface ChildComment {
  id: string;
  parentId: null | string;
  postId: string;
  username: string;
  createdAt: Date;
  text: string;
  recordingSrc: null | string;
}

export interface Comment extends ChildComment {
  children: ChildComment[];
}
