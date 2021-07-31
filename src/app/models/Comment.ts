export interface Comment {
  _id: string;
  postId: string;
  username: string;
  createdAt: Date;
  text: string;
  recordingSrc: string;
}
