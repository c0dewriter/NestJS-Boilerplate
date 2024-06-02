import { Injectable } from "@nestjs/common";
import path from "path";

@Injectable()
export class PostgresConfigService {
  public readonly dbType = "postgres";

  public readonly scheme = process.env.POSTGRES_CONNECTION_SCHEME;

  public readonly username = process.env.POSTGRES_SUPERUSER_USERNAME;
  public readonly password = process.env.POSTGRES_SUPERUSER_PASSWORD;

  public readonly host = process.env.POSTGRES_HOST;
  public readonly port = parseInt(
    process.env.POSTGRES_SERVICE_PORT_EXPOSE ??
      process.env.POSTGRES_SERVICE_PORT_MAP.split(":")[0],
  );
  public readonly database = process.env.POSTGRES_DEFAULT_DATABASE;

  public readonly schema = process.env.POSTGRES_SCHEMA;

  public readonly entities = [
    path.join(__dirname, "../", "../", "**", "*.entity.{ts,js}"),
  ];

  public readonly subscribers = [
    path.join(__dirname, "../", "../", "**", "*.subscriber.{ts,js}"),
  ];
}
