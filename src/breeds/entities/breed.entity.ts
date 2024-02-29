import { IsString } from "class-validator";
import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Breed {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  @IsString()
  name: string;

  @OneToMany(() => Cat, (cat) => cat.breed)
  cats: Cat[];
}
