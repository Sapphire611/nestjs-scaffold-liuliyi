import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './tasks.schema';
import {
  TaskCountResponse,
  TaskDetailRequest,
  TaskCreateRequest,
  TaskRequest,
} from './tasks.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getTasks(query: object): Promise<Task[]> {
    return await this.taskModel.find(query).exec();
  }

  async getTaskCount(): Promise<TaskCountResponse> {
    const count = await this.taskModel.countDocuments().exec();
    const alive = await this.taskModel.countDocuments({ alive: true }).exec();

    return { count: count, alive: alive };
  }

  async getTaskDetail(param: TaskDetailRequest): Promise<Task | null> {
    return await this.taskModel.findOne(param);
  }

  async createTask(body: TaskCreateRequest): Promise<Task> {
    return await this.taskModel.create(body);
  }

  async updateTask(param: TaskRequest, body: Task): Promise<object> {
    return await this.taskModel.updateOne({ _id: param.id }, body, {});
  }

  async deleteTask(param: object): Promise<object> {
    return await this.taskModel.deleteOne(param);
  }
}
