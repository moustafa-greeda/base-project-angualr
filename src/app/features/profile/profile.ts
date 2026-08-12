import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { Card } from '../../shared/components/cards/card/card';
import { FormField, FieldOption } from '../../shared/ui/form-field/form-field';
import { FormSection } from '../../shared/ui/form-section/form-section';
import { Button } from '../../shared/ui/button/button';
import { Badge } from '../../shared/ui/badge/badge';
import { ToastService } from '../../shared/ui/toast/toast.service';
import { AuthService } from '../../auth/service/auth';
import { USER_TYPE_LABEL } from '../../auth/model/Iuser';

type Tab = 'personal' | 'security' | 'preferences';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, PageHeader, Card, FormField, FormSection, Button, Badge],
  templateUrl: './profile.html',
})
export class Profile {
  private fb = inject(FormBuilder);
  private toast = inject(ToastService);
  private auth = inject(AuthService);

  user = this.auth.user();

  activeTab = signal<Tab>('personal');
  saving = signal(false);

  tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'personal', label: 'Personal Info', icon: 'bi bi-person' },
    { key: 'security', label: 'Security', icon: 'bi bi-shield-lock' },
    { key: 'preferences', label: 'Preferences', icon: 'bi bi-sliders' },
  ];

  languages: FieldOption[] = [
    { label: 'العربية', value: 'ar' },
    { label: 'English', value: 'en' },
  ];

  departments: FieldOption[] = [
    { label: 'Administration', value: 'admin' },
    { label: 'Human Resources', value: 'hr' },
    { label: 'Legal Affairs', value: 'legal' },
    { label: 'Finance', value: 'finance' },
    { label: 'Operations', value: 'operation' },
  ];

  /** readable role name, e.g. "Human Resources" instead of "hr" */
  roleLabel = computed(() => {
    const type = this.user?.userType;
    return type ? USER_TYPE_LABEL[type] : '—';
  });

  /** initials shown when there is no avatar image */
  initials = computed(() => {
    const name = this.user?.username ?? '';
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join('');
  });

  profileForm = this.fb.group({
    username: [this.user?.username ?? '', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    jobTitle: [''],
    department: [null as string | null],
    bio: [''],
    avatar: [null as File | null],
  });

  passwordForm = this.fb.group({
    current: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirm: ['', [Validators.required]],
  });

  preferencesForm = this.fb.group({
    language: ['ar'],
    emailNotifications: [true],
    pushNotifications: [false],
    weeklyReport: [true],
  });

  setTab(tab: Tab) {
    this.activeTab.set(tab);
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.toast.error('Please fix the highlighted fields');
      return;
    }
    this.saving.set(true);
    // simulates the API call until the backend is wired
    setTimeout(() => {
      this.saving.set(false);
      this.toast.success('Your profile was updated');
    }, 900);
  }

  changePassword() {
    const { password, confirm } = this.passwordForm.value;
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
    if (password !== confirm) {
      this.toast.error('The two passwords do not match');
      return;
    }
    this.passwordForm.reset();
    this.toast.success('Password changed successfully');
  }

  savePreferences() {
    this.toast.success('Preferences saved');
  }
}
