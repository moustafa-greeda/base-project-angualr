import { Component, inject, input, model, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Modal } from '../modal/modal';
import { ModalService } from '../modal/service/modal.service';

@Component({
  selector: 'app-form-shell',
  imports: [ReactiveFormsModule, Modal],
  templateUrl: './form-shell.html',
  styleUrl: './form-shell.css',
})
export class FormShell {

  _modal = inject(ModalService);
  title = input<string>('');
  form = input.required<FormGroup>();
  submitForm = output<any>();

  submit() {
    const form = this.form();
    if (form.valid) {
      this.submitForm.emit(form.value);
      this._modal.closeModal();
    } else {
      form.markAllAsTouched();
    }
  }

  close() {
    console.log( "from close in form shell =====>",this._modal.open())
    this._modal.closeModal();
  }
}
