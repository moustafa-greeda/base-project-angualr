import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { FormField, FieldOption } from '../../shared/ui/form-field/form-field';
import { FormSection } from '../../shared/ui/form-section/form-section';
import { Button } from '../../shared/ui/button/button';

@Component({
  selector: 'app-forms-showcase',
  imports: [ReactiveFormsModule, JsonPipe, PageHeader, FormField, FormSection, Button],
  templateUrl: './forms.html',
})
export class FormsShowcase {
  private fb = inject(FormBuilder);

  departments: FieldOption[] = [
    { label: 'Engineering', value: 'eng' },
    { label: 'Sales', value: 'sales' },
    { label: 'Accounting', value: 'acc' },
    { label: 'HR', value: 'hr' },
  ];

  genders: FieldOption[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  /** long list — shows why the searchable select exists */
  employees: FieldOption[] = [
    { label: 'Ahmed Al-Qahtani', value: 1, hint: 'ahmed@ghasiq.com' },
    { label: 'Sara Ahmed', value: 2, hint: 'sara@ghasiq.com' },
    { label: 'Omar Khaled', value: 3, hint: 'omar@ghasiq.com' },
    { label: 'Mona Yousef', value: 4, hint: 'mona@ghasiq.com' },
    { label: 'Khalid Nasser', value: 5, hint: 'khalid@ghasiq.com' },
    { label: 'Layla Hassan', value: 6, hint: 'layla@ghasiq.com' },
    { label: 'Yousef Ibrahim', value: 7, hint: 'yousef@ghasiq.com' },
    { label: 'Nora Saleh', value: 8, hint: 'nora@ghasiq.com' },
    { label: 'Faisal Otaibi', value: 9, hint: 'faisal@ghasiq.com' },
    { label: 'Huda Mansour', value: 10, hint: 'huda@ghasiq.com' },
  ];

  skills: FieldOption[] = [
    { label: 'Security', value: 'security' },
    { label: 'Maintenance', value: 'maintenance' },
    { label: 'Cleaning', value: 'cleaning' },
    { label: 'Driving', value: 'driving' },
    { label: 'First Aid', value: 'first-aid' },
    { label: 'Firefighting', value: 'firefighting' },
    { label: 'Reception', value: 'reception' },
    { label: 'Data Entry', value: 'data-entry' },
  ];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    salary: [null, [Validators.min(0)]],
    hireDate: [null],
    department: [null as string | null, [Validators.required]],
    manager: [null as number | null, [Validators.required]],
    skillSet: [[] as string[]],
    gender: ['male'],
    bio: [''],
    contract: [null as File | null, [Validators.required]],
    attachments: [[] as File[]],
    address: this.fb.group({
      city: [''],
      street: [''],
      building: [''],
    }),
    active: [true],
    terms: [false, [Validators.requiredTrue]],
  });

  submitted = signal(false);

  submit() {
    if (this.form.valid) {
      this.submitted.set(true);
    } else {
      this.form.markAllAsTouched();
    }
  }

  /** form.value with File objects replaced by their names, so it can be JSON-printed */
  get printableValue() {
    const toName = (f: File) => `${f.name} (${f.size} bytes)`;
    const v: any = { ...this.form.value };
    if (v.contract) v.contract = toName(v.contract);
    if (v.attachments?.length) v.attachments = v.attachments.map(toName);
    return v;
  }
}
