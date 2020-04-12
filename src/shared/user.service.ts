import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../types/user';
import { Model } from 'mongoose';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>){}

  private sanitiseUser(user : User){
    return user.depopulate('password')
  }

  async create(userDTO: RegisterDTO) {
    const { username } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
    }
    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return this.sanitiseUser(createdUser);
  }

  async findByLogin(userDTO: LoginDTO ){
    const { username, password } = userDTO;
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED)
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitiseUser(user);
    } else {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED)
    }
  }
}
