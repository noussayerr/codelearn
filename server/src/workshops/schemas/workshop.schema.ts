import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type WorkshopDocument = Workshop & Document;

@Schema({ _id: false })
class Lesson {
  @Prop({ required: true }) id!: string;
  @Prop({ required: true }) title!: string;
  @Prop({ required: true, enum: ['video', 'reading', 'interactive', 'exercise'] }) type!: string;
  @Prop() duration?: string;
  @Prop({ type: MongooseSchema.Types.Mixed }) content?: unknown;
}

const LessonSchema = SchemaFactory.createForClass(Lesson);

@Schema({ _id: false })
class ModuleItem {
  @Prop({ required: true }) id!: string;
  @Prop({ required: true }) title!: string;
  @Prop({ default: 0 }) progress!: number;
  @Prop({ type: [LessonSchema], default: [] }) lessons!: Lesson[];
}

const ModuleSchema = SchemaFactory.createForClass(ModuleItem);

@Schema({ timestamps: true })
export class Workshop {
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) description!: string;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) instructorId!: Types.ObjectId;
  @Prop({ default: 'Beginner' }) level!: string;
  @Prop({ default: 'Free' }) price!: string;
  @Prop({ default: 'English' }) language!: string;
  @Prop({ default: 'Web Development' }) category!: string;
  @Prop({ default: 0 }) rating!: number;
  @Prop({ default: 0 }) reviews!: number;
  @Prop({ default: 0 }) students!: number;
  @Prop() thumbnail?: string;
  @Prop({ type: [String], default: [] }) tags!: string[];
  @Prop({ type: [ModuleSchema], default: [] }) modules!: ModuleItem[];
}

export const WorkshopSchema = SchemaFactory.createForClass(Workshop);



