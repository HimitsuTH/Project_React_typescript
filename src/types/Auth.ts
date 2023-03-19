export default interface IUser {
  id?: any | null;
  name: string;
  email: string;
  roles?: string;
}

export interface Token {
  access_token?: string;
  expires_in?: string | number;
}