import { Component, HostListener, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormDailogService } from './service/form-dialog.service';

@Component({
  selector: 'app-dialog-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dialog-form.html',
  styleUrl: './dialog-form.css',
})
export class DialogForm {

  _modal = inject(FormDailogService);
  title = input<string>('');
  form = input.required<FormGroup>();
  submitForm = output<any>();

  open(){
    return this._modal.open()
  }
  
  close() {
    this._modal.closeModal()
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if(this.open()) this.close();
  }

    submit() {
    const form = this.form();
    if (form.valid) {
      this.submitForm.emit(form.value);
      this._modal.closeModal();
    } else {
      form.markAllAsTouched();
    }
  }
}
