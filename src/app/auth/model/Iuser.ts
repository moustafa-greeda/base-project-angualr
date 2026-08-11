export type IuserType = 'admin' | 'hr' | 'legal' | 'finance' | 'operation';

export interface IUser {
  username: string;
  password: string;
  userType: IuserType;
}

/** display label per role, used in menus and profile screens */
export const USER_TYPE_LABEL: Record<IuserType, string> = {
  admin: 'Administrator',
  hr: 'Human Resources',
  legal: 'Legal Affairs',
  finance: 'Finance',
  operation: 'Operations',
};
