import type { HttpStatus } from "@nestjs/common";

import {
  EXCEPTION_CAUSE,
  ExceptionCause,
  ExceptionCauseObject,
} from "@/base/exceptions/exception.cause";
import {
  EXCEPTION_DOMAIN,
  EXCEPTION_ORIGIN,
  ExceptionDomainKey,
  ExceptionOriginKey,
} from "@/base/exceptions/exception.meta";

export class ClassifiedException<
  Domain extends ExceptionDomainKey,
  Origin extends ExceptionOriginKey,
  Cause extends ExceptionCause<Origin>,
> extends Error {
  __proto__ = Error;

  public message: string;
  public help?: Array<string>;
  public status: HttpStatus;
  public domain: Domain;
  public origin: Origin;
  public cause: Cause;

  constructor(status: HttpStatus, domain: Domain, origin: Origin, cause: Cause) {
    const errDomainCode: string = EXCEPTION_DOMAIN[domain].CODE;
    const errOriginCode: string = EXCEPTION_ORIGIN[origin];
    const errCauseObject: ExceptionCauseObject<Origin> = EXCEPTION_CAUSE[origin][cause];

    const errMsg = `E${errDomainCode}${errOriginCode}${(errCauseObject as Record<string, string>).code}`;

    super(errMsg);
    Object.setPrototypeOf(this, ClassifiedException.prototype);

    this.message = errMsg;
    this.status = status;
    this.origin = origin;
    this.domain = domain;
    this.cause = cause;
    this.help = (
      EXCEPTION_CAUSE[origin][cause] as ExceptionCauseObject<Origin> & {
        help: Array<string>;
      }
    )["help"];
  }
}
