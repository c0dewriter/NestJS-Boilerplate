import type { HttpStatus } from "@nestjs/common";

export interface IErrorResponseInterface {
  statusCode: HttpStatus;
  message: string;
  help?: Array<string>;
  __dev__?: {
    stack: string;
  };
}
