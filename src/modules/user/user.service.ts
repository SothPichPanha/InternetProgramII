import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  create(userData: Partial<User>) {
    const user = this.usersRepo.create(userData);
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find({ relations: ['tasks'] });
  }

  findOne(id: number) {
    return this.usersRepo.findOne({ where: { id }, relations: ['tasks'] });
  }

  findByUsername(username: string) {
    return this.usersRepo.findOne({ where: { username }, relations: ['tasks'] });
  }

  async updateByUsername(username: string, updateData: Partial<User>) {
    const user = await this.usersRepo.findOne({ where: { username } });
    if (!user) return null;
    await this.usersRepo.update(user.id, updateData);
    return this.findOne(user.id);
  }

  async removeByUsername(username: string) {
    const user = await this.usersRepo.findOne({ where: { username } });
    if (!user) return null;
    await this.usersRepo.delete(user.id);
    return { deleted: true };
  }
}