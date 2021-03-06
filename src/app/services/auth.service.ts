import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpHeader = {
    // eslint-disable-next-line
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  async register({ username, password }) {
    const url = `${this.apiBaseUrl}/auth/register`;
    const response = await this.http
      .post<any>(url, { username, password }, this.httpHeader)
      .toPromise();
    this.storeToken(response);
    return response;
  }

  async login({ username, password }) {
    const url = `${this.apiBaseUrl}/auth/login`;
    const response = await this.http
      .post<any>(url, { username, password }, this.httpHeader)
      .toPromise();
    this.storeToken(response);
    return response;
  }

  async logout() {
    localStorage.removeItem('snapmuse_token');
  }

  private storeToken({ data }) {
    localStorage.setItem('snapmuse_token', data);
  }
}
