import { IUser } from '../model/Iuser';

/** account entry used by the mock login until a real API exists */
export interface IMockAccount extends IUser {
  displayName: string;
  /** shown on the demo-accounts list */
  description: string;
  icon: string;
}

export const MOCK_USERS: IMockAccount[] = [
  {
    username: 'admin',
    password: '123456',
    userType: 'admin',
    displayName: 'Ahmed Al-Qahtani',
    description: 'Full access to every module',
    icon: 'bi bi-shield-lock',
  },
  {
    username: 'hr',
    password: '123456',
    userType: 'hr',
    displayName: 'Sara Ahmed',
    description: 'Employees, CVs and payroll',
    icon: 'bi bi-people',
  },
  {
    username: 'legal',
    password: '123456',
    userType: 'legal',
    displayName: 'Omar Khaled',
    description: 'Contracts and legal affairs',
    icon: 'bi bi-briefcase',
  },
  {
    username: 'finance',
    password: '123456',
    userType: 'finance',
    displayName: 'Mona Yousef',
    description: 'Invoices, treasury and reports',
    icon: 'bi bi-calculator',
  },
  {
    username: 'operation',
    password: '123456',
    userType: 'operation',
    displayName: 'Khalid Nasser',
    description: 'Projects, schedules and field work',
    icon: 'bi bi-gear-wide-connected',
  },
];

/** returns the matching account, or null when the credentials are wrong */
export function findMockUser(username: string, password: string): IMockAccount | null {
  const u = username.trim().toLowerCase();
  return MOCK_USERS.find((m) => m.username === u && m.password === password) ?? null;
}
