import { Tasks } from './features/tasks/tasks';
import { IUser } from './features/users/service/user.service';
import { Users } from './features/users/users';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Users , Tasks],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
selectedUser?: IUser;
}
