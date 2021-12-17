import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'clicksoft',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts, .js}'],
      synchronize: true,
      autoLoadEntities: true,
      migrations: ['dist/database/migrations/{.ts, .js}'],
      migrationsTableName: 'migrations_typeorm',
      migrationsRun: true,
    }),
    StudentsModule,
    TeachersModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule { }
