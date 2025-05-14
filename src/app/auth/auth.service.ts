import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5251/api/Auth/sign-in';

  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }
}
