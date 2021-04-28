import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthPayload, LoginRequest } from '../models/auth.interface';
import { User } from '../models/user.interface';

const URL: string = 'http://localhost:3000/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedIn.asObservable();

  private authToken: string;
  private refreshToken: string;

  constructor(private http: HttpClient) { 
    const tokens = localStorage.tokens ? JSON.parse(localStorage.tokens) : null;
    
    if (tokens) {
      this.authToken = tokens.authToken;
      this.refreshToken = tokens.refreshToken;
      this.loggedIn.next(true);
    }
  }

  async login(credentials: LoginRequest): Promise<string> {
    try {  
      const response = await this.http.post<AuthPayload>(URL+'/login', credentials).toPromise();
  
      if (response.data.authToken && response.data.refreshToken) {
        this.loggedIn.next(true);
        this.updateTokens(response);
      }
      console.log(response.message);
      return response.message;
    } catch (e) {
      console.log(e);
      
      return ''
    }
  }

  async register(user: User): Promise<string> {
    const response = await this.http.post<AuthPayload>(URL+'/register', user).toPromise();
    console.log(response.message);
    
    return response.message;
  }

  async logout(): Promise<string> {
    const response = await this.http.post<AuthPayload>(URL+'/logout', { token: this.refreshToken }).toPromise();
    this.loggedIn.next(false);
    console.log(response.message);
    localStorage.removeItem('tokens');
    return response.message;
  }

  async requestToken(): Promise<void> {
    const response = await this.http.post<AuthPayload>(URL+'/refresh-token', { token: this.refreshToken }).toPromise();
    this.updateTokens(response);
    console.log(response.message);
  }

  private updateTokens(response: AuthPayload): void {    
    this.authToken = response.data.authToken;
    this.refreshToken = response.data.refreshToken;

    const tokens = {
      authToken: this.authToken,
      refreshToken: this.refreshToken,
    }

    localStorage.tokens = JSON.stringify(tokens);
  }

}
