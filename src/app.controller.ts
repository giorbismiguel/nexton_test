import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { OperationsAvailableGuard } from './operations-available/operations-available.guard';


@Controller('calculator')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseGuards(OperationsAvailableGuard)
  calculator(@Body('expression') expression: string): string {
    try {
      return this.appService.evalExpression(expression);    
    } catch (error) {
      throw new BadRequestException('Malformed expression');
      
    }
    
  }
}
