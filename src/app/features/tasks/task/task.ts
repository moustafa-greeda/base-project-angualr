import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  task = input<any>()
  deleteTask = output()

  onDelete(){
    this.deleteTask.emit(this.task())
  }
}
