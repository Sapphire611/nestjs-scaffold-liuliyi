import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.schema';
import {
  TaskCountResponse,
  TaskListRequest,
  TaskDetailRequest,
  TaskCreateRequest,
  TaskRequest,
} from './tasks.interface';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(@Query() query: TaskListRequest): Promise<Task[]> {
    return await this.tasksService.getTasks(query);
  }

  @Get('/count')
  async getTaskCount(): Promise<TaskCountResponse> {
    return this.tasksService.getTaskCount();
  }

  @Get('/:id')
  async getTaskDetail(@Param() param: TaskDetailRequest): Promise<Task | null> {
    return await this.tasksService.getTaskDetail(param);
  }

  @Post()
  async createTask(@Body() body: TaskCreateRequest): Promise<Task> {
    return await this.tasksService.createTask(body);
  }

  @Patch('/:id')
  async updateTask(
    @Param() param: TaskRequest,
    @Body() body: Task,
  ): Promise<object> {
    return await this.tasksService.updateTask(param, body);
  }

  @Delete('/:id')
  async deleteTask(@Param() param: object): Promise<object> {
    return await this.tasksService.deleteTask(param);
  }
}

/**
 * [
    {
        "_id": "63c0e7d53cdbb3cfdbd1f43a",
        "name": "test1",
        "status": true
    },
    {
        "_id": "63c0e7db3cdbb3cfdbd1f43b",
        "name": "test2",
        "status": false
    }
]
 */
