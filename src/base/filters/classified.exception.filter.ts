import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

import { ClassifiedException } from "@/base/exceptions/exception.class";
import { IErrorResponseInterface } from "@/base/types/response.typing";

@Catch(ClassifiedException)
export class ClassifiedExceptionFilter implements ExceptionFilter {
  catch(exception: ClassifiedException<never, never, never>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.status;

    const responseBody: IErrorResponseInterface = {
      statusCode: status,
      message: exception.message,
      help: exception.help,
    };

    if (process.env.NODE_ENV === "development") {
      responseBody.__dev__ = { stack: <string>exception.stack };
    }

    response.status(status).json(responseBody);
  }
}
