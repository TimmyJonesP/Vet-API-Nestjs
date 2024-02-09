import {
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
  IsPositive,
} from "class-validator";

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  age: number;

  @IsOptional()
  @IsString()
  breed?: string;
}
