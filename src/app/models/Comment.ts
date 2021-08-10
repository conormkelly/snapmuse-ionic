interface BaseComment {
  id: string;
  parentId?: null | string;
  postId: string;
  user: {
    username: string;
  };
  createdAt: Date;
  text: string;
  recordingSrc: string;
}

export interface Comment extends BaseComment {
  children?: null | BaseComment[];
}
