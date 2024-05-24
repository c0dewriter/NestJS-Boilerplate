// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv {
    POSTGRES_CONNECTION_SCHEME: "postgres" | "postgresql";
    POSTGRES_SCHEMA: string;
    POSTGRES_HOST: string;
    POSTGRES_SERVICE_PORT_MAP: `${number}:${number}`;
    POSTGRES_SERVICE_PORT_EXPOSE: string;
    POSTGRES_DEFAULT_DATABASE: string;
    POSTGRES_SUPERUSER_USERNAME: string;
    POSTGRES_SUPERUSER_PASSWORD: string;
  }
}
