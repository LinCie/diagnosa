import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SignUpBody } from './app.interface';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpBody) {
    return await this.appService.signUp(body);
  }

  @Post('login')
  async logIn(@Body() body: SignUpBody) {
    return await this.appService.logIn(body);
  }
}
