import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Workshop, WorkshopSchema } from './schemas/workshop.schema';
import { WorkshopsService } from './workshops.service';
import { WorkshopsController } from './workshops.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Workshop.name, schema: WorkshopSchema }])],
  providers: [WorkshopsService],
  controllers: [WorkshopsController],
})
export class WorkshopsModule {}



