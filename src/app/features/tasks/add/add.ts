import { Component, computed, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogForm } from '../../../shared/components/dialog/dialog-form/dialog-form';
import { FormDailogService } from '../../../shared/components/dialog/dialog-form/service/form-dialog.service';

@Component({
  selector: 'app-task-form',
  imports: [DialogForm, ReactiveFormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add {
  task = input<any>(null); // null = Add, object = Edit
  submitForm = output<any>();

  private fb = inject(FormBuilder);
  private _modal = inject(FormDailogService);

  title = computed(() => (this.task() ? 'Edit Task' : 'Add Task'));
  isEdit = computed(() => !!this.task());

  form = this.fb.group({
    name: [''],
    description: [''],
  });

  // ✅ لما task يتغير → املأ الفورم
  constructor() {
    effect(() => {
      const task = this.task();
      if (task) {
        this.form.patchValue({
          name: task.name,
          description: task.discription,
        });
      } else {
        this.form.reset();
      }
    });
  }

  save(data: any) {
    this.submitForm.emit({ ...data, id: this.task()?.id ?? null });
    this._modal.closeModal();
  }
}
