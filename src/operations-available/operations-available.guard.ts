import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OperationsAvailableGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const expression = request.body.expression;

    const valid = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      '+',
      '-',
      '*',
      '/',
      '(',
      ')',
      ' ',
    ];

    if (!expression) {
      throw new BadRequestException('Empty expression');
    }

    // The only operations available will be + -* /.
    // The only term separator will be the (. We WON'T use ( or I as term division.
    for (const item of expression) {
      if (!valid.includes(item)) {
        throw new BadRequestException(
          'Invalid expression, invalid character: ' + item,
        );
      }
    }

    return true;
  }
}
