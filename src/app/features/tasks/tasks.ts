import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../users/service/user.service';
import { Task } from './task/task';
import { Add } from './add/add';
import { FormDailogService } from '../../shared/components/dialog/dialog-form/service/form-dialog.service';
interface ITask {
  id: number;
  userId: number;
  name: string;
  discription: string;
}
@Component({
  selector: 'app-tasks',
  imports: [Task, Add],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  _modal = inject(FormDailogService);

  selectedUserService = inject(UserService);
  user = this.selectedUserService.selectedUser;

  openForm() {
    this._modal.openModal();
  }


  tasks = signal<ITask[]>([
    {
      id: 1,
      userId: 1,
      name: 'task 1 for user 1',
      discription: ' any words in dicriotion',
    },
    {
      id: 2,
      userId: 1,
      name: 'task 2 for user 1',
      discription: ' any words in dicriotion',
    },
    {
      id: 3,
      userId: 2,
      name: 'task 1 for user 2',
      discription: ' any words in dicriotion',
    },
    {
      id: 4,
      userId: 2,
      name: 'task 2 for user 2',
      discription: ' any words in dicriotion',
    },
    {
      id: 5,
      userId: 3,
      name: 'task 2 for user 3',
      discription: ' any words in dicriotion',
    },
    {
      id: 6,
      userId: 3,
      name: 'task 1 for user 3',
      discription: ' any words in dicriotion',
    },
    {
      id: 7,
      userId: 3,
      name: 'task 1 for user 3',
      discription: ' any words in dicriotion',
    },
    {
      id: 8,
      userId: 2,
      name: 'task 3 for user 2',
      discription: ' any words in dicriotion',
    },
    {
      id: 9,
      userId: 2,
      name: 'task 3 for user 2',
      discription: ' any words in dicriotion',
    },
    {
      id: 10,
      userId: 2,
      name: 'task 3 for user 2',
      discription: ' any words in dicriotion',
    },
    {
      id: 11,
      userId: 2,
      name: 'task 3 for user 2',
      discription: ' any words in dicriotion',
    },
  ]);

  filterdTasks = computed(() => {
    const userId = this.user();
    return this.tasks().filter((task) => task.userId == userId);
  });

  // delete task
  deleteTask(data: any) {
    this.tasks.update((task) => task.filter((t) => t.id !== data.id));
  }
}
