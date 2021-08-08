export interface Comment {
  id: string;
  postId: string;
  user: {
    username: string;
  };
  createdAt: Date;
  text: string;
  recordingSrc: string;
}
