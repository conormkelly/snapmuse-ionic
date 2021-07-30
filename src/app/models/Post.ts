export interface Post {
  _id: string;
  title: string;
  createdAt: string;
  imageSrc: {
    large: string;
    medium: string;
    small: string;
  };
}
