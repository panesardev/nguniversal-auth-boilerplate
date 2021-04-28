import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class PreloadUserGuard implements Resolve<User> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const username = route.paramMap.get('username');
    return this.userService.findByUsername(username).pipe(first());
  }

}
