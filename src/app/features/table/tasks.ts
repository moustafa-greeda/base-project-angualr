import { Component, DestroyRef, effect, inject, signal, isDevMode } from '@angular/core';
import { UserService } from '../users/service/user.service';
import { FormDailogService } from '../../shared/components/dialog/dialog-form/service/form-dialog.service';
import { Table } from '../../shared/components/table/table';
import { ConfirmDeleteService } from '../../shared/components/dialog/dialog-delete/service/confirm-delete.service';
import { Delete } from './delete/delete';
import { Add } from './add/add';
import { TasksService } from './service/tasks.service';
import { log } from 'console';

interface ITask {
  id: number;
  userId: number;
  name: string;
  discription: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [Table, Add],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  private _modal = inject(FormDailogService);
  private _modalDelete = inject(ConfirmDeleteService);
  private _userService = inject(UserService);
  private _tasksService = inject(TasksService);
  data = this._tasksService.allData;
  current_page = signal(1);
  last_page = signal(1);
  prev_page = signal(1);
  next_page = signal(1);
  loading = signal(false);

  destroyRef = inject(DestroyRef);

  user = this._userService.selectedUser;
  selectedTask = signal<ITask | null>(null);

  // ngOnInit() {
  //   this._tasksService.getTasks().subscribe((res) => {
  //     this.current_page.set(res.data.current_page);
  //     console.log('current ', this.current_page());
  //     this.last_page.set(res.data.last_page);
  //     console.log('last page ===== >', this.last_page());
  //     this.last_page.set(res.data.last_page);
  //     console.log('next page ===== >', this.next_page());
  //     this.last_page.set(res.data.next_page);
  //     console.log('last page ===== >', this.last_page());
  //   });
  // }

  // ───────────── Open Add Dialog ─────────────
  openForm() {
    this.selectedTask.set(null);
    this._modal.openModal();
    console.log('aaaa open');
  }

  // ───────────── Edit handler ─────────────
  // onEditClick(task: ITask) {
  //   this.selectedTask.set(task);
  //   this._modal.openModal();
  // }
  onConfirmForm(data: any) {
    if (data) {
      // Edit
      this.tasks.update((list) =>
        list.map((t) =>
          t.id === data.id ? { ...t, name: data.name, discription: data.description } : t,
        ),
      );
    } else {
      // Add
      const newId = Math.max(...this.tasks().map((t) => t.id)) + 1;
      this.tasks.update((list) => [
        ...list,
        { id: newId, userId: this.user()!, name: data.name, discription: data.description },
      ]);
    }
    this.selectedTask.set(null);
  }

  // ── Delete handlers ──────────────────────────
  // onDeleteClick(task: ITask) {
  //   this.selectedTask.set(task);
  //   this._modalDelete.openModal();
  // }

  // onConfirmDelete() {
  //   const task = this.selectedTask();
  //   if (!task) return;
  //   this.tasks.update((list) => list.filter((t) => t.id !== task.id));
  //   this.selectedTask.set(null);
  // }

  // ── Data ─────────────────────────────────────
  tasks = signal<ITask[]>([
    { id: 1, userId: 1, name: 'task 1 for user 1', discription: 'any words in description' },
    { id: 2, userId: 1, name: 'task 2 for user 1', discription: 'any words in description' },
    { id: 3, userId: 2, name: 'task 1 for user 2', discription: 'any words in description' },
    { id: 4, userId: 2, name: 'task 2 for user 2', discription: 'any words in description' },
    { id: 5, userId: 3, name: 'task 2 for user 3', discription: 'any words in description' },
    { id: 6, userId: 3, name: 'task 1 for user 3', discription: 'any words in description' },
    { id: 7, userId: 3, name: 'task 3 for user 3', discription: 'any words in description' },
    { id: 8, userId: 2, name: 'task 3 for user 2', discription: 'any words in description' },
    { id: 9, userId: 2, name: 'task 4 for user 2', discription: 'any words in description' },
    { id: 10, userId: 2, name: 'task 5 for user 2', discription: 'any words in description' },
    { id: 11, userId: 2, name: 'task 6 for user 2', discription: 'any words in description' },
  ]);

  // filterdTasks = computed(() => this.tasks().filter((task) => task.userId == this.user()));

  columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'first_name' },
    { header: 'last_name', field: 'last_name' },
    { header: 'Actions', field: 'actions' },
  ];
}
