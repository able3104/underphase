import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { userPayloadClass } from './userPayload.class';
import { UserPayload } from './userPayload';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // const authHeader = request.headers.authorization;
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }
    const token = authHeader.split(' ')[1];

    try {
      const payload: UserPayload = await this.jwtService.verify(token);
      const userPayload = new userPayloadClass();
      userPayload.userPayload.token = payload.token;
      request['user'] = userPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
