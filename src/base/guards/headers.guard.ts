import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

import { ClassifiedException } from "@/base/exceptions/exception.class";

@Injectable()
export class RequiredHeadersGuard implements CanActivate {
  protected readonly requiredHeaders: string[];

  constructor(requiredHeaders: string[]) {
    this.requiredHeaders = requiredHeaders;
  }

  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    const incomingHeaders = Object.keys(context.switchToHttp().getRequest().headers);

    if (!this.requiredHeaders.every((h) => incomingHeaders.includes(h))) {
      if (process.env.NODE_ENV === "development") {
        throw new BadRequestException(
          `Missing Required Headers ${this.requiredHeaders}`,
        );
      }

      throw new ClassifiedException(
        HttpStatus.BAD_REQUEST,
        "UNBOUND",
        "COMMON",
        "MISSING_MANDATORY_HEADERS",
      );
    }

    return true;
  }
}
