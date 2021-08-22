import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  register({ username, password }): Observable<any> {
    const url = `${this.apiBaseUrl}/auth/register`;
    return this.http
      .post<any>(url, { username, password }, this.httpHeader)
      .pipe(tap(this.storeToken));
  }

  login({ username, password }): Observable<any> {
    const url = `${this.apiBaseUrl}/auth/login`;
    return this.http
      .post<any>(url, { username, password }, this.httpHeader)
      .pipe(tap(this.storeToken));
  }

  logout() {
    localStorage.removeItem('snapmuse_token');
    const url = `${this.apiBaseUrl}/auth/logout`;
    return this.http
      .post<any>(url, {}, this.httpHeader)
      .pipe(tap(this.storeToken));
  }

  private storeToken({ data }) {
    localStorage.setItem('snapmuse_token', data);
  }
}
