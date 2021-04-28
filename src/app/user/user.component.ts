import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user$: Observable<User>;

  constructor(public auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user$ = this.route.data as Observable<User>;
  }

}
