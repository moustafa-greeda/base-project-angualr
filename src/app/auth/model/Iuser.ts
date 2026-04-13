export type IuserType = 'admin' | 'user' | 'sales' | 'telesales' | 'accountant';

export interface IUser {
  username: string;
  password: string;
  userType: IuserType;
}
