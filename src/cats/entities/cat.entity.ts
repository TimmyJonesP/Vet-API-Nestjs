import { User } from "src/users/entities/user.entity";
import { Breed } from "../../breeds/entities/breed.entity";
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @ManyToOne(() => Breed, (breed) => breed.id, {
    // cascade: true,
    eager: true,
  })
  @ManyToOne(() => Breed, (breed) => breed.id, {
    eager: true,
  })
  breed: Breed;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userEmail", referencedColumnName: "email" })
  user: User;

  @Column()
  userEmail: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
