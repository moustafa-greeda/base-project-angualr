import { Component, inject, input } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Select } from '../select/select';

/** option for select / radio fields */
export interface FieldOption {
  label: string;
  value: any;
  /** searchable-select only: secondary line under the label */
  hint?: string;
  disabled?: boolean;
}

export type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'date'
  | 'textarea'
  /** native dropdown — fine for a handful of fixed options */
  | 'select'
  /** searchable dropdown, single choice */
  | 'search-select'
  /** searchable dropdown, several choices */
  | 'multi-select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'file';

/** One message per validator key — extend as new validators are used */
const ERROR_MESSAGES: Record<string, (error: any) => string> = {
  required: () => 'This field is required',
  minlength: (e) => `Minimum length is ${e.requiredLength} characters`,
  maxlength: (e) => `Maximum length is ${e.requiredLength} characters`,
  email: () => 'Invalid email address',
  min: (e) => `Minimum value is ${e.min}`,
  max: (e) => `Maximum value is ${e.max}`,
  pattern: () => 'Invalid format',
  requiredTrue: () => 'Must be accepted',
};

/**
 * Design-system form field: label + control + auto validation messages.
 * Resolves its control from the nearest ControlContainer (formGroup /
 * formGroupName / array row), so it composes anywhere in a reactive form:
 *
 *   <app-form-field label="Name" controlName="name" />
 *   <app-form-field label="Phone" controlName="address.phone" />        <!-- nested path -->
 *   <app-form-field label="Branch" controlName="branch" type="select" [options]="branches" />
 *   <app-form-field label="Gender" controlName="gender" type="radio" [options]="genders" />
 *   <app-form-field label="Active" controlName="active" type="switch" />
 *   <app-form-field label="I agree" controlName="terms" type="checkbox" />
 */
@Component({
  selector: 'app-form-field',
  imports: [ReactiveFormsModule, Select],
  templateUrl: './form-field.html',
  host: {
    class: 'block',
    '[class.md:col-span-full]': "span() === 'full'",
  },
})
export class FormField {
  label = input<string>('');
  /** control name, or dot path for nested groups: "address.phone" */
  controlName = input.required<string>();
  type = input<FieldType>('text');
  placeholder = input<string>('');
  /** options for type="select" and type="radio" */
  options = input<FieldOption[]>([]);
  /** 'full' → span the whole row of the surrounding form-section grid */
  span = input<'full' | undefined>(undefined);
  /** per-field overrides: { required: 'name is required' } */
  errorMessages = input<Record<string, string>>({});
  /** type="file": accepted types, e.g. ".pdf,.png" or "image/*" */
  accept = input<string>('');
  /** type="file": allow picking several files */
  multiple = input(false);

  private container = inject(ControlContainer, { optional: true });

  get control(): FormControl | null {
    const c: AbstractControl | null | undefined = this.container?.control?.get(this.controlName());
    return (c as FormControl) ?? null;
  }

  get errorMessage(): string | null {
    const c = this.control;
    if (!c || !c.touched || !c.errors) return null;
    const [key, error] = Object.entries(c.errors)[0];
    return this.errorMessages()[key] ?? (ERROR_MESSAGES[key] ?? (() => 'Invalid value'))(error);
  }

  // ── file input ────────────────────────────────────────────────
  /** files currently held by the control (File or File[]) */
  get files(): File[] {
    const v = this.control?.value;
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const picked = Array.from(input.files ?? []);
    if (!picked.length) return;

    if (this.multiple()) {
      // append to what is already there, skipping duplicates
      const existing = this.files;
      const fresh = picked.filter(
        (p) => !existing.some((e) => e.name === p.name && e.size === p.size),
      );
      this.control?.setValue([...existing, ...fresh]);
    } else {
      this.control?.setValue(picked[0]);
    }
    this.control?.markAsTouched();
    input.value = ''; // allow re-picking the same file after removing it
  }

  /** removes one file from the list, keeping the others */
  removeFile(index: number) {
    this.control?.setValue(
      this.multiple() ? this.files.filter((_, i) => i !== index) : null,
    );
    this.control?.markAsTouched();
  }

  /** 1536 → "1.5 KB" */
  fileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
