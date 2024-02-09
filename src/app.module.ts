import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    CatsModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3308,
      username: "sandrocarioli43@gmail.com",
      password: "root",
      database: "db_crud",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
