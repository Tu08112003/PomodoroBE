import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userObjectId } from '../common/utils/object-id.util';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAllByUser(userId: string): Promise<TodoDocument[]> {
    return this.todoModel
      .find({ userId: userObjectId(userId) })
      .select('-userId')
      .sort({ createdAt: -1 })
      .exec();
  }

  async create(userId: string, dto: CreateTodoDto): Promise<TodoDocument> {
    const content = dto.content.trim();
    if (!content) {
      throw new BadRequestException('Content must not be empty');
    }

    const ownerId = userObjectId(userId);
    if (dto.clientId) {
      const existing = await this.todoModel
        .findOne({ userId: ownerId, clientId: dto.clientId })
        .select('-userId')
        .exec();
      if (existing) return existing;
    }

    const todo = new this.todoModel({
      userId: ownerId,
      content,
      clientId: dto.clientId,
    });

    try {
      const saved = await todo.save();
      saved.set('userId', undefined, { strict: false });
      return saved;
    } catch (error) {
      if (dto.clientId && (error as { code?: number }).code === 11000) {
        const existing = await this.todoModel
          .findOne({ userId: ownerId, clientId: dto.clientId })
          .select('-userId')
          .exec();
        if (existing) return existing;
      }
      throw error;
    }
  }

  async update(userId: string, todoId: string, dto: UpdateTodoDto): Promise<TodoDocument> {
    const updates: Record<string, string | boolean> = {};
    if (dto.content !== undefined) {
      const content = dto.content.trim();
      if (!content) {
        throw new BadRequestException('Content must not be empty');
      }
      updates.content = content;
    }
    if (dto.completed !== undefined) {
      updates.completed = dto.completed;
    }

    if (Object.keys(updates).length === 0) {
      throw new BadRequestException('At least one field is required');
    }

    const todo = await this.todoModel
      .findOneAndUpdate(
        { _id: todoId, userId: userObjectId(userId) },
        { $set: updates },
        { new: true, runValidators: true },
      )
      .select('-userId')
      .exec();

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }

  async delete(userId: string, todoId: string): Promise<void> {
    const result = await this.todoModel
      .findOneAndDelete({ _id: todoId, userId: userObjectId(userId) })
      .exec();

    if (!result) {
      throw new NotFoundException('Todo not found');
    }
  }
}
