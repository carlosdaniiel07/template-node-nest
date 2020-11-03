import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  index(): any {
    return { message: 'API is running!' }
  }
}