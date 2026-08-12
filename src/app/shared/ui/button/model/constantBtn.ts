import { ButtonSize, ButtonVariant } from './ibutton.interface';

export const BASE_CLASSES =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]';

  export const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--primary)] text-white shadow-sm hover:brightness-110',
  secondary: 'bg-[var(--secondary)] text-white shadow-sm hover:brightness-110',
  success: 'bg-[var(--success-color)] text-white shadow-sm hover:brightness-110',
  info: 'bg-[var(--info-color)] text-white shadow-sm hover:brightness-110',
  warning: 'bg-[var(--warning-color)] text-white shadow-sm hover:brightness-110',
  danger: 'bg-[var(--bg-error)] text-white shadow-sm hover:brightness-110',
  dangerOutline: 'border border-[var(--bg-error)] text-[var(--text-color)] hover:border-[var(--bg-error)] hover:bg-[var(--bg-error)]/8 hover:text-[var(--bg-error)]',
  outline:
    'border border-[var(--border-color)] text-[var(--text-color)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/8 hover:text-[var(--primary)]',
  ghost: 'text-[var(--text-color)] hover:bg-[var(--row-hover)] hover:text-[var(--primary)]',
};

export const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

/** square sizes used when iconOnly — no horizontal padding */
export const ICON_ONLY_SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'size-8 text-sm',
  md: 'size-10 text-base',
  lg: 'size-12 text-lg',
};