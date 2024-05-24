import * as path from "path";
import { DataSource } from "typeorm";

const __nodeEnv__ = String(process.env.NODE_ENV);

// ** =============================================================== ** //
// **                           Environment                           ** //
// ** =============================================================== ** //
// * Note: Environment variables are not read from `.env` files inside pods. They are 'set'
const POSTGRES_HOST = process.env.POSTGRES_HOST;

// ** ONLY USED IN PRODUCTION
const POSTGRES_SERVICE_PORT_EXPOSE = process.env.POSTGRES_SERVICE_PORT_EXPOSE;

const POSTGRES_SERVICE_PORT_MAP = process.env.POSTGRES_SERVICE_PORT_MAP;
const POSTGRES_SUPERUSER_USERNAME = process.env.POSTGRES_SUPERUSER_USERNAME;

const POSTGRES_SUPERUSER_PASSWORD = process.env.POSTGRES_SUPERUSER_PASSWORD;

const POSTGRES_DEFAULT_DATABASE = process.env.POSTGRES_DEFAULT_DATABASE;

const POSTGRES_SCHEMA = process.env.POSTGRES_SCHEMA;

if (
  !POSTGRES_HOST ||
  !POSTGRES_SERVICE_PORT_EXPOSE ||
  !POSTGRES_SERVICE_PORT_MAP ||
  !POSTGRES_SUPERUSER_USERNAME ||
  !POSTGRES_SUPERUSER_PASSWORD ||
  !POSTGRES_DEFAULT_DATABASE ||
  !POSTGRES_SCHEMA
) {
  console.error("Some env variables are not set. Check.");
  process.exit(1);
}

// ** =============================================================== ** //
// **                      The Actual Environment                     ** //
// ** =============================================================== ** //
export const config: DataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: parseInt(
    __nodeEnv__ === "production"
      ? (POSTGRES_SERVICE_PORT_EXPOSE as string)
      : POSTGRES_SERVICE_PORT_MAP.split(":")[0],
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
