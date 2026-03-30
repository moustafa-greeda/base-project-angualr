import { Component, computed, effect, inject, input, output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogForm } from '../../../shared/components/dialog/dialog-form/dialog-form';
import { FormDailogService } from '../../../shared/components/dialog/dialog-form/service/form-dialog.service';
import { log } from 'node:console';

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
    name: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required]],
    address: this.fb.group({
      phone: [''],
      line1: [''],
      line2: [''],
    }),
    skills: this.fb.array([]),
  });
  get arrayFormSkills() {
    return this.form.controls.skills as FormArray;
  }
  addSkill() {
    const fg = this.fb.group({
      name: [''],
      department: [''],
      amount: [''],
    });
    this.arrayFormSkills.push(fg);
  }
  save(data: any) {
    console.log('data from function save ', data);
    this.submitForm.emit({ ...data, id: this.task()?.id ?? null });
    this._modal.closeModal();
    this.form.reset();
  }

  removeSkill(i: number) {
    this.arrayFormSkills.removeAt(i);
  }

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
}
