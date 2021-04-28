import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

const URL: string = 'http://localhost:3000/users';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }

  findByUsername(username: string): Observable<User> {
    return this.http.get<User>(URL +'/'+ username);
  }

}
