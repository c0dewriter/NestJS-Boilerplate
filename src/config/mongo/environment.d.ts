// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv {
    MONGO_CONNECTION_SCHEME: string;
    MONGO_HOST: string;
    MONGO_INITDB_ROOT_USERNAME: string;
    MONGO_INITDB_ROOT_PASSWORD: string;
    MONGO_INITDB_DATABASE: string;

    MONGO_SERVICE_NAME: string;
    MONGO_RESTART_POLICY: string;
    MONGO_SERVICE_PORT_MAP: `${number}:${number}`;
    MONGO_SERVICE_PORT_EXPOSE: string;
    MONGO_SERVICE_DIR_NAME: string;
  }
}
