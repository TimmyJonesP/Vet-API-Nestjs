import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateBreedDto } from "./dto/create-breed.dto";
import { UpdateBreedDto } from "./dto/update-breed.dto";
import { Breed } from "./entities/breed.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BreedsService {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}
  async create(createBreedDto: CreateBreedDto) {
    return await this.breedRepository.save(createBreedDto);
  }

  async findAll() {
    return await this.breedRepository.find();
  }

  async findOne(id: number) {
    return `This action returns a #${id} breed`;
  }

  async update(id: number, updateBreedDto: UpdateBreedDto) {
    const breed = await this.breedRepository.findOneBy({ id });

    if (!breed) {
      throw new BadRequestException("Breed not found");
    }
    let name;
    if (updateBreedDto.name) {
      name = await this.breedRepository.findOneBy({
        name: updateBreedDto.name,
      });
    }
    return await this.breedRepository.save({
      name,
    });
  }

  async remove(id: number) {
    return await this.breedRepository.softDelete(id);
  }
}
