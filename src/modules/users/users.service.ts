import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.findOne({ 
        where: { email: createUserDto.email } 
      });
      if (existingUser) {
        return {
          errCode: 1,
          errMessage: 'Email đã tồn tại!',
        };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const createdUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(createdUser);
      const { password, ...result } = savedUser;

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
    return this.userRepository.find({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        address: true,
        phoneNumber: true,
        gender: true,
        image: true,
        roleId: true,
        positionId: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        address: true,
        phoneNumber: true,
        gender: true,
        image: true,
        roleId: true,
        positionId: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    if (!user) {
      throw new NotFoundException('User không tồn tại!');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
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

      await this.userRepository.update(id, updateUserDto);
      const updatedUser = await this.userRepository.findOne({
        where: { id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          address: true,
          phoneNumber: true,
          gender: true,
          image: true,
          roleId: true,
          positionId: true,
          createdAt: true,
          updatedAt: true,
        }
      });

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

  async remove(id: number): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return {
          errCode: 1,
          errMessage: 'User không tồn tại!',
        };
      }

      await this.userRepository.delete(id);
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

      const user = await this.userRepository.findOne({ where: { email } });
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

      const { password: _, ...result } = user;
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
        const users = await this.userRepository.find({
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            address: true,
            phoneNumber: true,
            gender: true,
            image: true,
            roleId: true,
            positionId: true,
            createdAt: true,
            updatedAt: true,
          }
        });
        return users;
      } else {
        const userId = parseInt(id);
        if (isNaN(userId)) return [];
        
        const user = await this.userRepository.findOne({
          where: { id: userId },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            address: true,
            phoneNumber: true,
            gender: true,
            image: true,
            roleId: true,
            positionId: true,
            createdAt: true,
            updatedAt: true,
          }
        });
        return user ? [user] : [];
      }
    } catch (error) {
      return [];
    }
  }
} 