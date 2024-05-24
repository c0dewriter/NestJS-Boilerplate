import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";

import { OUT_META_KEY } from "@/base/decorators/out.decorator";
import { transformWithExclude } from "@/base/transformers/response.transformer";

@Injectable()
export class OutInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  /**
   * This interceptor is responsible for making sure all controllers have an
   * `out` type exclusively set for them.
   * @param context: see ExecutionContext of `@nestjs/common`
   * @param next: see CallHandler of `@nestjs/common`
   * @returns Either an `Observable` or a Promise of it.
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> | Promise<Observable<unknown>> {
    return next.handle().pipe(
      map((data) => {
        const OutType = this.reflector.get<unknown>(OUT_META_KEY, context.getHandler());

        if (!OutType) {
          throw new Error(`Out Type is not set for this route`);
        }

        return transformWithExclude(data, OutType);
      }),
    );
  }
}
