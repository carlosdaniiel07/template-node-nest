import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

import { ApiException } from "src/exceptions/ApiException";

@Catch(ApiException)
export class GlobalErrorHandler implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    return res.status(exception.getStatus()).json({ message: exception.message })
  }
}