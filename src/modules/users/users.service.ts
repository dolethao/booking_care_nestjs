import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      // Check if user already exists
      const existingUser = await this.userModel.findOne({ email: createUserDto.email });
      if (existingUser) {
        return {
          errCode: 1,
          errMessage: 'Email đã tồn tại!',
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      const savedUser = await createdUser.save();
      const { password, ...result } = savedUser.toObject();

      return {
        errCode: 0,
        errMessage: 'Tạo user thành công!',
        user: result,
      };
    } catch (error) {
      return {
        errCode: 1,
        errMessage: 'Có lỗi xảy ra!',
      };
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException('User không tồn tại!');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return {
          errCode: 1,
          errMessage: 'User không tồn tại!',
        };
      }

      // If password is being updated, hash it
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .select('-password')
        .exec();

      return {
        errCode: 0,
        errMessage: 'Cập nhật user thành công!',
        user: updatedUser,
      };
    } catch (error) {
      return {
        errCode: 1,
        errMessage: 'Có lỗi xảy ra!',
      };
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return {
          errCode: 1,
          errMessage: 'User không tồn tại!',
        };
      }

      await this.userModel.findByIdAndDelete(id);
      return {
        errCode: 0,
        errMessage: 'Xóa user thành công!',
      };
    } catch (error) {
      return {
        errCode: 1,
        errMessage: 'Có lỗi xảy ra!',
      };
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    try {
      const { email, password } = loginUserDto;

      if (!email || !password) {
        return {
          errCode: 1,
          errMessage: 'Thiếu thông tin đăng nhập!',
        };
      }

      const user = await this.userModel.findOne({ email });
      if (!user) {
        return {
          errCode: 1,
          errMessage: 'Email không tồn tại!',
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          errCode: 1,
          errMessage: 'Mật khẩu không đúng!',
        };
      }

      const { password: _, ...result } = user.toObject();
      return {
        errCode: 0,
        errMessage: 'Đăng nhập thành công!',
        user: result,
      };
    } catch (error) {
      return {
        errCode: 1,
        errMessage: 'Có lỗi xảy ra!',
      };
    }
  }

  async getAllUsers(id: string): Promise<any> {
    try {
      if (id === 'ALL') {
        const users = await this.userModel.find().select('-password').exec();
        return users;
      } else {
        const user = await this.userModel.findById(id).select('-password').exec();
        return user ? [user] : [];
      }
    } catch (error) {
      return [];
    }
  }
} 