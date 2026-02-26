import { Injectable, signal } from '@angular/core';
export interface IUser {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser = signal<number | null>(null)

    users = [
    {
      id: 1,
      name: "moustafa"
    },
     {
      id: 2,
      name: "adam"
    },
     {
      id: 3,
      name: "ahmed"
    }
  ]

  setUser(id :number){
    this.selectedUser.set(id)
  }
}
