import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { Response } from "express";

import { ApiException } from "src/models/api-exception.model";

@Catch(ApiException)
export class GlobalErrorHandler implements ExceptionFilter {
  private readonly logger = new Logger(GlobalErrorHandler.name)
  
  catch(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    this.logger.error(`Exceção capturada: ${exception.message} - status: ${exception.getStatus()}`)

    return res.status(exception.getStatus()).json({ message: exception.message })
  }
}