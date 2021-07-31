/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/Post';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private httpHeader = {
    // eslint-disable-next-line
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private apiBaseUrl = 'http://localhost:3000';

  private posts: Post[] = [];
  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject(
    this.posts
  );

  constructor(private http: HttpClient) {}

  getPostsListener() {
    return this.postsSubject.asObservable();
  }

  // TODO: handle error case
  async getPostById(id: string) {
    let post = this.posts.find((p) => p._id === id);
    if (!post) {
      const response = await this.http
        .get<any>(`${this.apiBaseUrl}/posts/${id}`)
        .toPromise();
      if (response.success) {
        post = response.data;
      } else {
        post = null;
      }
    }
    return post;
  }

  async getAllPosts() {
    try {
      const url = `${this.apiBaseUrl}/posts`;
      const posts = await this.http
        .get<Post[]>(url, this.httpHeader)
        .toPromise();
      this.posts = posts;
      this.postsSubject.next(this.posts);
      return true;
    } catch (err) {
      return false;
    }
  }

  getComments(postId: string) {
    const url = `${this.apiBaseUrl}/posts/${postId}/comments`;
    return this.http.get<any>(url, this.httpHeader).toPromise();
  }

  addComment({ audioFile, text, postId }) {
    const url = `${this.apiBaseUrl}/posts/${postId}/comments`;

    const options = {};
    const formData = new FormData();

    // Append files and data to the virtual form
    formData.append('audio', audioFile);
    formData.append('text', text);
    return this.http.post<any>(url, formData, options);
  }
}
