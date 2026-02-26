import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormShell } from '../../../shared/form-shell/form-shell';

@Component({
  selector: 'app-add',
  imports: [ FormShell  ],
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
