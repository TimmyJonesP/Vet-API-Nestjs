import { PartialType } from "@nestjs/mapped-types";
import { CreateBreedDto } from "./create-breed.dto";
import { IsString, MinLength } from "class-validator";

export class UpdateBreedDto extends PartialType(CreateBreedDto) {
  @IsString()
  @MinLength(2)
  name: string;
}
