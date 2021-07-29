import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private apiBaseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // TODO: figure out cookies and tokens

  register({ username, password }) {
    const url = `${this.apiBaseUrl}/auth/register`;
    return this.http.post<any>(url, { username, password }, this.httpHeader);
  }

  login({ username, password }) {
    const url = `${this.apiBaseUrl}/auth/login`;
    return this.http.post<any>(url, { username, password }, this.httpHeader);
  }

  logout() {
    const url = `${this.apiBaseUrl}/auth/logout`;
    return this.http.post<any>(url, {}, this.httpHeader);
  }
}
