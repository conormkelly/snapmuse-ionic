import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private apiBaseUrl = environment.apiBaseUrl;

  private httpHeader = {
    // eslint-disable-next-line
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  setIsLiked({ commentId, isLiked }) {
    const url = `${this.apiBaseUrl}/likes/${commentId}`;
    return this.http
      .put<any>(url, { value: isLiked }, this.httpHeader)
      .toPromise();
  }

  getAllUserLikes() {
    const url = `${this.apiBaseUrl}/likes`;
    return this.http.get<any>(url, this.httpHeader).toPromise();
  }
}
