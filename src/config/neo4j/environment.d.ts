// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv {
    NEO4J_CONNECTION_SCHEME: "neo4j" | "bolt";
    NEO4J_HOST: string;
    NEO4J_SERVICE_PORT_MAP: `${number}:${number}`;
    NEO4J_SERVICE_PORT_EXPOSE: string | null;
    NEO4J_USERNAME: string;
    NEO4J_PASSWORD: string;
  }
}
