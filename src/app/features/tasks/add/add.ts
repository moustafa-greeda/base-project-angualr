import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DialogForm } from '../../../shared/components/dialog/dialog-form/dialog-form';

@Component({
  selector: 'app-add',
  imports: [ DialogForm],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add {
  private fb = inject(FormBuilder)

  form = this.fb.group({
    id: [''],
    name: [''],
    description: [''],
  });

  save(data: any) {
    console.log(data);
  }
}
