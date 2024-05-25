import { Injectable } from "@nestjs/common";

export const MONGO_CONFIG_MODULE_CONTEXT = "Mongo";

@Injectable()
export class MongoConfigService {
  public readonly scheme = process.env.MONGO_CONNECTION_SCHEME;

  public readonly username = process.env.MONGO_INITDB_ROOT_USERNAME;
  public readonly password = process.env.MONGO_INITDB_ROOT_PASSWORD;

  public readonly host = process.env.MONGO_HOST;
  public readonly port =
    process.env.MONGO_SERVICE_PORT_EXPOSE ??
    process.env.MONGO_SERVICE_PORT_MAP.split(":")[0];

  public readonly database = process.env.MONGO_INITDB_DATABASE;

  public readonly uriWithoutUserPass = `${this.scheme}://${this.host}:${this.port}/`;
}
