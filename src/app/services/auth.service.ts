import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../types/LoginRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private hostUrl : string = 'http://localhost:9181/exptracker/'

  constructor(private http: HttpClient) { }
  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.hostUrl}login`,{
      email: loginRequest.userEmail,
      password: loginRequest.userPassword
    });
  }

  storeUserData(token: string, userId: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  clearUserData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId')
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
}
