export interface Comment {
  _id: string;
  postId: string;
  userName: string;
  createdAt: Date;
  text: string;
  recordingSrc: string;
}
