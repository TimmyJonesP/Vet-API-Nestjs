import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Cat } from "./entities/cat.entity";
import { Repository } from "typeorm";
import { Breed } from "../breeds/entities/breed.entity";
import { UserActiveInterface } from "../common/interfaces/user-active.interface";
import { Role } from "../common/enums/role.enum";
import { CatValidators } from "src/common/validators/cat.validators";

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,

    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,

    @Inject(CatValidators)
    private readonly catValidators: CatValidators,
  ) {}

  async create(createCatDto: CreateCatDto, user: UserActiveInterface) {
    const breed = await this.catValidators.validateBreed(createCatDto.breed);

    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
      userEmail: user.email,
    });
  }

  async findAll(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) {
      return await this.catRepository.find();
    }
    return await this.catRepository.find({
      where: { userEmail: user.email },
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const cat = await this.catRepository.findOneBy({ id });

    if (!cat) {
      throw new BadRequestException("Cat not found!");
    }

    this.catValidators.validateOwnership(cat, user);

    return cat;
  }

  async update(
    id: number,
    updateCatDto: UpdateCatDto,
    user: UserActiveInterface,
  ) {
    await this.findOne(id, user);

    return await this.catRepository.update(id, {
      ...updateCatDto,
      breed: updateCatDto.breed
        ? await this.catValidators.validateBreed(updateCatDto.breed)
        : undefined,
      userEmail: user.email,
    });
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user);
    return await this.catRepository.softDelete({ id });
  }
}
