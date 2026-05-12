import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(new ValidationPipe({ whitelist: true })) payload: RegisterDto) {
    return this.authService.register(payload);
  }

  @Post('login')
  login(@Body(new ValidationPipe({ whitelist: true })) payload: LoginDto) {
    return this.authService.login(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req) {
    return req.user;
  }
}
