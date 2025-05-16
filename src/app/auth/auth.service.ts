import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';

interface RegisterData {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiBaseUrl = 'http://localhost:5251/api/Auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/sign-in`, { email, password });
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/register`, data);
  }
}
