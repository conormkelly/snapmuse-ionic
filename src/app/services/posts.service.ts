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

  getAllPosts() {
    const url = `${this.apiBaseUrl}/posts`;
    this.http.get<Post[]>(url, this.httpHeader).subscribe((posts) => {
      this.posts = posts;
      this.postsSubject.next(this.posts);
    });
  }

  getComments(postId: string) {
    const url = `${this.apiBaseUrl}/posts/${postId}/comments`;
    return this.http.get<any>(url, this.httpHeader);
  }

  addComment({ audioFile, text, postId, parentId }) {
    const url = `${this.apiBaseUrl}/posts/${postId}/comments`;

    const options = {};
    const formData = new FormData();

    // Append files and data to the virtual form
    formData.append('audio', audioFile);
    formData.append('text', text);
    if (parentId) {
      formData.append('parentId', parentId);
    }

    return this.http.post<any>(url, formData, options);
  }
}