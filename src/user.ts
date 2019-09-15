// tslint:disable-next-line:interface-name
export interface AuthEntity {
  type: string;
  value: string;
}

// tslint:disable-next-line:interface-name
export interface AuthUserResponse {
  id: string;
  entities: AuthEntity[];
}
