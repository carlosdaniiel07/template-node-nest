import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingMiddleware implements NestInterceptor {
  private readonly logger = new Logger(LoggingMiddleware.name)

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`Resposta enviada (${Date.now() - now}ms)`)),
      );
  }
}