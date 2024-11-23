import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user-dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ){}

    async getAll(): Promise<UserEntity[]> {
        return await this.userRepo.find();
    }

    async getById(id: number): Promise<UserEntity> {
        return await this.userRepo.findOne({
            where: {id: id},
        });
    }

    async createUser(newUser: CreateUserDto): Promise<UserEntity> {
        const newu = new UserEntity();
        newu.name = newUser.name;
        newu.email = newUser.email;
        newu.password = newUser.password;
        newu.role = newUser.role;
        newu.state = newUser.state;
        newu.birthdate = newUser.birthdate;
        return await this.userRepo.save(newu);
    }

    async updateUser(id: number, modifiedUser: CreateUserDto): Promise<UserEntity> {
        const userUpdate: UserEntity = await this.userRepo.findOneBy({id:id});
        userUpdate.name = modifiedUser.name;
        userUpdate.email = modifiedUser.email;
        userUpdate.password = modifiedUser.password;
        userUpdate.role = modifiedUser.role;
        userUpdate.state = modifiedUser.state;
        userUpdate.birthdate = modifiedUser.birthdate;
        return await this.userRepo.save(userUpdate);
    }

    async deleteUser(id: number): Promise<any> {
        return await this.userRepo.delete(id);
    }

}
