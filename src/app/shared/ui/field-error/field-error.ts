import { Component, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export const FORM_ERRORS: Record<string, (err: any) => string> = {
  required: () => 'هذا الحقل مطلوب',
  minlength: ({ requiredLength }) => `الحد الأدنى ${requiredLength} أحرف`,
  maxlength: ({ requiredLength }) => `الحد الأقصى ${requiredLength} أحرف`,
  email: () => 'البريد الإلكتروني غير صحيح',
  min: ({ min }) => `الحد الأدنى للقيمة ${min}`,
  max: ({ max }) => `الحد الأقصى للقيمة ${max}`,
  pattern: () => 'الصيغة غير صحيحة',
};

@Component({
  selector: 'app-field-error',
  imports: [],
  templateUrl: './field-error.html',
  styleUrl: './field-error.css',
})
export class FieldError {
    control   = input.required<AbstractControl | null>();
  // أي رسائل custom تجي من بره
  customErrors = input<Record<string, (e: any) => string>>({});

  errorMessage = computed(() => {
    const ctrl = this.control();
    if (!ctrl || !ctrl.invalid || !ctrl.touched) return null;

    const errors = { ...FORM_ERRORS, ...this.customErrors() };
    const firstKey = Object.keys(ctrl.errors || {})[0];
    return errors[firstKey]?.(ctrl.errors![firstKey]) ?? 'خطأ غير معروف';
  });
}
