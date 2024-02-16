import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class RegisterDto {
  @IsString()
  @MinLength(2)
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
