import { CallHandler, ExecutionContext, Injectable, NestInterceptor, } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    console.log('USERID: ' + userId)
    if(userId) {
      request.currentUser = await this.usersService.findOne(userId);
    }
    return handler.handle();
  }
}
