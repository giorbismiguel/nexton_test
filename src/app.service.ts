import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  evalExpression(expression: string): string {
    return eval?.(`"use strict";(${expression})`);
  }
}
