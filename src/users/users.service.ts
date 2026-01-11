import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';  
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsersService {
    private users = [
        {id: 1, name: 'Alice', email: 'alice@example.com', role: 'ENGINEER'},
        {id: 2, name: 'Bob', email: 'bob@example.com', role: 'INTERN'},
        {id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'ADMIN'},
        {id: 4, name: 'David', email: 'david@example.com', role: 'ENGINEER'},
        {id: 5, name: 'Eve', email: 'eve@example.com', role: 'INTERN'},
        {id: 6, name: 'Frank', email: 'frank@example.com', role: 'ADMIN'},
        {id: 7, name: 'Grace', email: 'grace@example.com', role: 'ENGINEER'}
    ];
    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if(role){
            const roleArray = this.users.filter(user => user.role === role);
            if(roleArray.length === 0){
                throw new NotFoundException(`No users found with role ${role}`);
            }
            return this.users.filter(user => user.role === role);
        }   else{
            return this.users;
        }   
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if(!user){
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }   

    create(CreateUserDto: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id)[0];
        const newUser = {
            id: userByHighestId.id + 1,
            ...CreateUserDto
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
     this.users =   this.users.map(user => {
            if(user.id === id){
                console.log('Updating user:', user, 'with', updateUserDto);
                user = { ...user, ...updateUserDto };
            }
            return user;

        })
        return this.findOne(id)
    }

    remove(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(u => u.id !== id);
        return removedUser;
    }
}