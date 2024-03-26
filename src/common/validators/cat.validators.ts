import { Injectable } from "@nestjs/common";
import { Cat } from "src/cats/entities/cat.entity";
import { UserActiveInterface } from "../interfaces/user-active.interface";
import { Role } from "../enums/role.enum";
import { UnauthorizedException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Breed } from "src/breeds/entities/breed.entity";

@Injectable()
export class CatValidators {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  validateOwnership(cat: Cat, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && cat.userEmail !== user.email) {
      throw new UnauthorizedException(
        "You dont have the permissions for this.",
      );
    }
  }

  async validateBreed(breed: string) {
    const breedEntity = await this.breedRepository.findOneBy({ name: breed });

    if (!breedEntity) {
      throw new BadRequestException("Breed not found");
    }

    return breedEntity;
  }
}
