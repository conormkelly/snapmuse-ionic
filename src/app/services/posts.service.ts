import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private apiBaseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllPosts() {
    const url = `${this.apiBaseUrl}/posts`;
    return this.http.get<any>(url, this.httpHeader);
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
