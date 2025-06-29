import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { ClinicsModule } from './modules/clinics/clinics.module';
import { SpecialtiesModule } from './modules/specialties/specialties.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AllcodesModule } from './modules/allcodes/allcodes.module';
import { MarkdownsModule } from './modules/markdowns/markdowns.module';
import { HistoriesModule } from './modules/histories/histories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/booking-care',
      }),
      inject: [ConfigService],
    }),
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
export class AppModule {}
