import * as dotenv from "dotenv";
import * as path from "path";
import { DataSource } from "typeorm";

const __nodeEnv__ = String(process.env.NODE_ENV);

// !! Don't touch ANYTHING
const __env = dotenv.config({
  path: path.join(__dirname, `.env.${__nodeEnv__}`),
  debug: true,
}).parsed;

// ** =============================================================== ** //
// **                           Environment                           ** //
// ** =============================================================== ** //
// * Note: Environment variables are not read from `.env` files inside pods. They are 'set'
const POSTGRES_HOST = __env?.POSTGRES_HOST || process.env.POSTGRES_HOST;

// ** ONLY USED IN PRODUCTION
const POSTGRES_SERVICE_PORT_EXPOSE =
  __env?.POSTGRES_SERVICE_PORT_EXPOSE || process.env.POSTGRES_SERVICE_PORT_EXPOSE;

const POSTGRES_SERVICE_PORT_MAP =
  __env?.POSTGRES_SERVICE_PORT_MAP || process.env.POSTGRES_SERVICE_PORT_MAP;
const POSTGRES_SUPERUSER_USERNAME =
  __env?.POSTGRES_SUPERUSER_USERNAME || process.env.POSTGRES_SUPERUSER_USERNAME;

const POSTGRES_SUPERUSER_PASSWORD =
  __env?.POSTGRES_SUPERUSER_PASSWORD || process.env.POSTGRES_SUPERUSER_PASSWORD;

const POSTGRES_DEFAULT_DATABASE =
  __env?.POSTGRES_DEFAULT_DATABASE || process.env.POSTGRES_DEFAULT_DATABASE;

const POSTGRES_SCHEMA = __env?.POSTGRES_SCHEMA || process.env.POSTGRES_SCHEMA;

// ** =============================================================== ** //
// **                      The Actual Environment                     ** //
// ** =============================================================== ** //
export const config: DataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: parseInt(
    __nodeEnv__ === "production"
      ? (POSTGRES_SERVICE_PORT_EXPOSE as string)
      : POSTGRES_SERVICE_PORT_MAP!.split(":")[0],
  ),
  username: POSTGRES_SUPERUSER_USERNAME,
  password: POSTGRES_SUPERUSER_PASSWORD,

  database: POSTGRES_DEFAULT_DATABASE,
  schema: POSTGRES_SCHEMA,

  synchronize: false,

  entities: [path.join("./src", "**", "*.entity.{ts,js}")],

  migrations: [path.join("./src", "migrations", "*{.ts,.js}")],
  migrationsTableName: "__migration_history__",
  migrationsRun: true,
});
