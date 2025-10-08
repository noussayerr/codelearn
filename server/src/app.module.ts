import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WorkshopsModule } from './workshops/workshops.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://noussayerrahal14_db_user:0hLB3IBytgZjOl2Z@cluster0.tmpeexp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UsersModule,
    AuthModule,
    WorkshopsModule,
  ],
})
export class AppModule {}



