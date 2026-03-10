import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private Task: Repository<Task>,
  ) {}

  getTask(id: string) {
    return this.Task.findOneBy({ id: parseInt(id) });
  }
  getAllTasks() {
    return this.Task.find({relations: ['user']});
  }
  createTask(body: any) {
    const task = this.Task.create(body);
    return this.Task.save(task);
  }

  updateTask(id: string, body: any) {
    return this.Task.update({ id: parseInt(id) }, body);
  }

  deleteTask(id: string) {
    return this.Task.delete({ id: parseInt(id) });
  }
}