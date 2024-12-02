import {
  Controller,
  Body,
  UseGuards,
  Post,
  Patch,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { AdminGuard } from '../shared/guards/admin.guard';

@Controller('admin/users')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createAdminUser(@Body() dto: CreateUserDto) {
    return this.userService.register(dto, true);
  }

  @Patch('admin/users/:id/role')
  async udpateRole(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateRole(id, updateUserDto.role);
  }
}
