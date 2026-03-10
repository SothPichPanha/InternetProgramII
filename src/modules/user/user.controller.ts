import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:username')
  getUser(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }
  @Get('/')
  getAllUsers() {
    return this.userService.findAll();
  }

  @Post('/')
  createUser(@Body() body: createUserDto) {
    return this.userService.create(body);
  }

  @Patch('/:username')
  updateUser(
    @Param('username') username: string,
    @Body() body: Partial<User>,
  ) {
    return this.userService.updateByUsername(username, body);
  }

  @Delete('/:username')
  deleteUser(@Param('username') username: string) {
    return this.userService.removeByUsername(username);
  }
}