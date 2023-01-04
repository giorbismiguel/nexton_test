import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('calculator')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  calculator(@Body('expression') expression: string): string {
    return this.appService.evalExpression(expression);
  }
}
