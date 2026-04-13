import { Component, inject, OnInit, signal } from '@angular/core';
import { IUser, UserService } from './service/user.service';
@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  _userService = inject(UserService);
  allusers!: IUser[];
  activeUser = signal<number>(0)

  ngOnInit() {
    this.allusers = this._userService.users;
  }

  selectedUser(id: number) {
    this.activeUser.set(id);
    this._userService.setUser(id);
  }
}
