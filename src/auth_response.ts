import { AuthUserResponse } from "./user";

// tslint:disable-next-line:interface-name
export interface AuthResponse {
  token: string;
  user: AuthUserResponse;
  user_info: any;
}
