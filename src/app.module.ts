import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { ClinicsModule } from './modules/clinics/clinics.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AllcodesModule } from './modules/allcodes/allcodes.module';
import { MarkdownsModule } from './modules/markdowns/markdowns.module';
import { HistoriesModule } from './modules/histories/histories.module';
import { LoggerMiddleware } from './helpers/logger.middleware';
import * as entities from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: Object.values(entities),
      synchronize: true,
      logging: ['warn', 'error']
    }),
    AuthModule,
    UsersModule,
    DoctorsModule,
    ClinicsModule,
    SpecialtiesModule,
    SchedulesModule,
    BookingsModule,
    AllcodesModule,
    MarkdownsModule,
    HistoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
