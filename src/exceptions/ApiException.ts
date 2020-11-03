import { HttpException } from "@nestjs/common";

export class ApiException extends HttpException {
  constructor(private statusCode: number, message: string) {
    super(message, statusCode)
  }
}