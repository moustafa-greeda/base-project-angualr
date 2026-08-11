import {
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClickOutside } from '../../directives/click-outside';

export interface SelectOption {
  label: string;
  value: any;
  /** optional secondary line, e.g. an email under a name */
  hint?: string;
  disabled?: boolean;
}

/**
 * Searchable select with optional multi-select.
 * Works with reactive forms through ControlValueAccessor:
 *
 *   <app-select formControlName="branch" [options]="branches" />
 *   <app-select formControlName="tags" [options]="tags" [multiple]="true" />
 */
@Component({
  selector: 'app-select',
  imports: [ClickOutside],
  templateUrl: './select.html',
  host: { class: 'block' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
})
export class Select implements ControlValueAccessor {
  options = input<SelectOption[]>([]);
  placeholder = input('Select...');
  searchPlaceholder = input('Search...');
  emptyText = input('No results');
  multiple = input(false);
  /** show a search box once the list is longer than this */
  searchThreshold = input(7);

  selectionChange = output<any>();

  private searchInput = viewChild<ElementRef<HTMLInputElement>>('searchBox');

  open = signal(false);
  search = signal('');
  /** single: the value · multiple: an array of values */
  private value = signal<any>(null);
  disabled = signal(false);

  /** keyboard cursor within the visible list */
  activeIndex = signal(0);

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  // ── derived view state ───────────────────────────
  showSearch = computed(() => this.options().length > this.searchThreshold());

  visibleOptions = computed(() => {
    const term = this.search().trim().toLowerCase();
    if (!term) return this.options();
    return this.options().filter(
      (o) =>
        o.label.toLowerCase().includes(term) || (o.hint ?? '').toLowerCase().includes(term),
    );
  });

  selectedOptions = computed<SelectOption[]>(() => {
    const v = this.value();
    if (v === null || v === undefined) return [];
    const values = this.multiple() ? (Array.isArray(v) ? v : []) : [v];
    return this.options().filter((o) => values.includes(o.value));
  });

  /** text shown on the closed trigger */
  triggerLabel = computed(() => {
    const selected = this.selectedOptions();
    if (!selected.length) return '';
    return this.multiple() ? '' : selected[0].label;
  });

  isSelected(option: SelectOption): boolean {
    return this.selectedOptions().some((o) => o.value === option.value);
  }

  // ── interaction ──────────────────────────────────
  toggle() {
    if (this.disabled()) return;
    this.open() ? this.close() : this.openPanel();
  }

  private openPanel() {
    this.open.set(true);
    this.search.set('');
    this.activeIndex.set(0);
    // focus the search box once the panel is painted
    queueMicrotask(() => this.searchInput()?.nativeElement.focus());
  }

  close() {
    if (!this.open()) return;
    this.open.set(false);
    this.onTouched();
  }

  select(option: SelectOption) {
    if (option.disabled) return;

    if (this.multiple()) {
      const current: any[] = Array.isArray(this.value()) ? this.value() : [];
      const next = current.includes(option.value)
        ? current.filter((v) => v !== option.value)
        : [...current, option.value];
      this.commit(next);
      // keep the panel open so several can be picked
    } else {
      this.commit(option.value);
      this.close();
    }
  }

  /** removes one chip in multi-select mode */
  remove(option: SelectOption, event: Event) {
    event.stopPropagation();
    const current: any[] = Array.isArray(this.value()) ? this.value() : [];
    this.commit(current.filter((v) => v !== option.value));
  }

  clear(event: Event) {
    event.stopPropagation();
    this.commit(this.multiple() ? [] : null);
  }

  private commit(v: any) {
    this.value.set(v);
    this.onChange(v);
    this.selectionChange.emit(v);
  }

  // ── keyboard ─────────────────────────────────────
  onKeydown(event: KeyboardEvent) {
    if (!this.open() && (event.key === 'Enter' || event.key === 'ArrowDown')) {
      event.preventDefault();
      this.openPanel();
      return;
    }
    if (!this.open()) return;

    const list = this.visibleOptions();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.activeIndex.update((i) => Math.min(i + 1, list.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (list[this.activeIndex()]) this.select(list[this.activeIndex()]);
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  onSearchInput(term: string) {
    this.search.set(term);
    this.activeIndex.set(0);
  }

  // ── ControlValueAccessor ─────────────────────────
  writeValue(v: any): void {
    this.value.set(v);
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}

