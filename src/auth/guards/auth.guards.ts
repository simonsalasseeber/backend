import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
 canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }

    const [authType, authValue] = authHeader.split(' ');

    if (authType !== 'Basic') {
      return false;
    }

    const [email, password] = Buffer.from(authValue, 'base64').toString('utf-8').split(':'); // check vs database remaining

    return true;
 }
}
