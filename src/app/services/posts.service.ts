/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/Post';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private httpHeader = {
    // eslint-disable-next-line
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private apiBaseUrl = environment.apiBaseUrl;

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
    let post = this.posts.find((p) => p.id === id);
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
      const res = await this.http
        .get<{ data: Post[] }>(url, this.httpHeader)
        .toPromise();
      this.posts = res.data;
      this.postsSubject.next(this.posts);
      return true;
    } catch (err) {
      return false;
    }
  }

  getComments(postId: string) {
    const url = `${this.apiBaseUrl}/posts/${postId}/comments`;
    return this.http.get<{ data: Comment[] }>(url, this.httpHeader).toPromise();
  }

  addComment({ audioFile, text, postId, parentId }) {
    const url = `${this.apiBaseUrl}/posts/${postId}/comments`;

    const formData = new FormData();

    // Append files and data to the virtual form
    formData.append('parentId', parentId);
    formData.append('audio', audioFile);
    formData.append('text', text);
    return this.http.post<any>(url, formData).toPromise();
  }
}
