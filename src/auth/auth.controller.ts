import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RequestWithUser } from "./interface/interfaces";
import { Role } from "./enums/role.enum";
import { Auth } from "./decorators/auth.decorators";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get("profile")
  @Auth(Role.ADMIN)
  profile(
    @Req()
    req: RequestWithUser,
  ) {
    return req.user;
  }
}
