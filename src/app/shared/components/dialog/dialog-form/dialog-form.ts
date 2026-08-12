import { Component, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormDailogService } from './service/form-dialog.service';
import { DialogShell } from '../dialog-shell/dialog-shell';
import { Button } from '../../../ui/button/button';

/**
 * Form dialog: the shell (backdrop, header, ESC, scroll lock) comes from
 * app-dialog — this component only owns the form submit/validation logic.
 */
@Component({
  selector: 'app-dialog-form',
  imports: [ReactiveFormsModule, DialogShell, Button],
  templateUrl: './dialog-form.html',
})
export class DialogForm {
  _modal = inject(FormDailogService);

  title = input<string>('');
  form = input.required<FormGroup>();
  submitForm = output<any>();

  open() {
    return this._modal.open();
  }

  close() {
    this._modal.closeModal();
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
