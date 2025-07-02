import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
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
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, "password">> {
    try {
      const existingUser = await this.userRepository.findOne({ 
        where: { email: createUserDto.email } 
      });
      if (existingUser) {
        throw new BadRequestException(`Email ${createUserDto.email} already exists!`);
      }
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const createdUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });

      const savedUser = await this.userRepository.save(createdUser);
      const { password, ...result } = savedUser;

      return result;
    } catch (error) {
      throw new BadRequestException('An error occurred!', error.message);
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
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found!');
      }

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

      return updatedUser;
    } catch (error) {
      throw new BadRequestException('An error occurred!', error.message);
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found!');
      }

     return await this.userRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('An error occurred!', error.message);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    try {
      const { email, password } = loginUserDto;

      if (!email || !password) {
        throw new BadRequestException('Email and password are required!');
      }

      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new BadRequestException('Email or password is incorrect!');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Email or password is incorrect!');
      }

      const { password: _, ...result } = user;
      
      const payload = { email: user.email, sub: user.id };
      const access_token = this.jwtService.sign(payload);
      
      return {
        user: result,
        access_token,
      };
    } catch (error) {
      throw new BadRequestException('An error occurred!', error.message);
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