import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Workshop, WorkshopDocument } from './schemas/workshop.schema';

@Injectable()
export class WorkshopsService {
  constructor(@InjectModel(Workshop.name) private readonly workshopModel: Model<WorkshopDocument>) {}

  async list(): Promise<WorkshopDocument[]> {
    return this.workshopModel.find().sort({ createdAt: -1 }).exec();
  }

  async getById(id: string): Promise<WorkshopDocument> {
    const doc = await this.workshopModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Workshop not found');
    return doc;
  }

  async create(input: Partial<Workshop> & { instructorId: string }): Promise<WorkshopDocument> {
    const created = new this.workshopModel({ ...input, instructorId: new Types.ObjectId(input.instructorId) });
    return created.save();
  }
}



