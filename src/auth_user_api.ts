import "reflect-metadata";
import { BaseApi } from "tsclienthttplib/lib";
import { HTTPMethod } from "tsclienthttplib/lib";
import { AuthEntity, AuthUserResponse } from "./user";

// tslint:disable-next-line:interface-name
export interface AuthUserApi {
  sendCodeToEntity: (entity: AuthEntity) => Promise<void>;
  verifyEntity: (entity: AuthEntity, code: string) => Promise<AuthUserResponse>;
  socialEntity: (
    providerType: string,
    token: string
  ) => Promise<AuthUserResponse>;
  removeEntity: (entity: AuthEntity) => Promise<AuthUserResponse>;
  getUser: () => Promise<AuthUserResponse>;
}

export class DefaultAuthUserApi extends BaseApi implements AuthUserApi {
  public async sendCodeToEntity(entity: AuthEntity): Promise<void> {
    const request = this._requestFactory.make(
      HTTPMethod.post,
      "/user/entity/send",
      null,
      entity
    );
    return this._requestPerformer.performRequest(request);
  }

  public async verifyEntity(
    entity: AuthEntity,
    code: string
  ): Promise<AuthUserResponse> {
    const request = this._requestFactory.make(
      HTTPMethod.post,
      "/user/entity/verify",
      null,
      { value: entity.value, type: entity.type, code }
    );
    return this._requestPerformer.performRequest(request);
  }

  public async removeEntity(entity: AuthEntity): Promise<AuthUserResponse> {
    const request = this._requestFactory.make(
      HTTPMethod.post,
      "/user/entity/remove",
      null,
      entity
    );
    return this._requestPerformer.performRequest(request);
  }

  public async getUser(): Promise<AuthUserResponse> {
    const request = this._requestFactory.make(HTTPMethod.get, "/user", null);
    return this._requestPerformer.performRequest(request);
  }

  public async socialEntity(
    providerType: string,
    token: string
  ): Promise<AuthUserResponse> {
    const request = this._requestFactory.make(
      HTTPMethod.post,
      "/user/entity/social",
      null,
      { token, type: providerType }
    );
    return this._requestPerformer.performRequest(request);
  }
}
