import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schemas/user.schema';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập người dùng' })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công' })
  @ApiResponse({ status: 401, description: 'Thông tin đăng nhập không đúng' })
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.usersService.login(loginUserDto);
    return result;
  }

  @Post()
  @ApiOperation({ summary: 'Tạo người dùng mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công', type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    return result;
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  @ApiResponse({ status: 200, description: 'Thành công', type: [User] })
  async findAll(@Query('id') id: string) {
    if (id) {
      const users = await this.usersService.getAllUsers(id);
      return {
        errCode: 0,
        errMessage: 'Ok',
        user: users,
      };
    }
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  @ApiResponse({ status: 200, description: 'Thành công', type: User })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công', type: User })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const result = await this.usersService.update(id, updateUserDto);
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa người dùng' })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy' })
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(id);
    return result;
  }
} 