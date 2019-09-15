import { BaseApi, HTTPMethod } from "tsclienthttplib/lib";
import { AuthResponse } from "./auth_response";
import { AuthEntity } from "./user";

// tslint:disable-next-line:interface-name
export interface AuthApi {
  sendCode: (entity: AuthEntity) => Promise<void>;
  verifyCode: (entity: AuthEntity, code: string) => Promise<AuthResponse>;
  socialLogin: (providerType: string, token: string) => Promise<AuthResponse>;
}

export class DefaultAuthApi extends BaseApi implements AuthApi {
  public async sendCode(entity: AuthEntity): Promise<void> {
    const request = this._requestFactory.make(
      HTTPMethod.post,
      "/auth/send",
      null,
      entity
    );
    return this._requestPerformer.performRequest(request);
  }

  public async verifyCode(
    entity: AuthEntity,
    code: string
  ): Promise<AuthResponse> {
    const request = this._requestFactory.make(
      HTTPMethod.post,
      "/auth/verify",
      null,
      {
        code,
        type: entity.type,
        value: entity.value
      }
    );
    return this._requestPerformer.performRequest(request);
  }

  public async socialLogin(
    providerType: string,
    token: string
  ): Promise<AuthResponse> {
    const request = this._requestFactory.make(
      HTTPMethod.post,
      "/auth/social",
      null,
      {
        token,
        type: providerType
      }
    );
    return this._requestPerformer.performRequest(request);
  }
}
