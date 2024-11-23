import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user-dto';


@Controller('user')
export class UserController {

    constructor(private userServ: UserService){}

    @Post()
    create(@Body() createUserDto : CreateUserDto, @Res() response){
        this.userServ.createUser(createUserDto)
            .then( user => {
                response.status(HttpStatus.CREATED).json(user);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the creation of the user'});
            });
    }

    @Get()
    getAll(@Res() response){
        this.userServ.getAll()
            .then( usersList => {
                response.status(HttpStatus.OK).json(usersList);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the getting of the users'});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idUser){
        this.userServ.getById(idUser)
            .then( user => {
                response.status(HttpStatus.OK).json(user);
            }).catch( () => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the getting of the user by id'});
            });
    }

    @Put(':id')
    update(@Body() updateUserDto: CreateUserDto, @Res() response, @Param('id') idUser : number){
        this.userServ.updateUser(idUser, updateUserDto)
            .then(userUpdated => {
                response.status(HttpStatus.OK).json(userUpdated);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the modification of the user'});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idUser : number){
        this.userServ.deleteUser(idUser)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: 'Error in the elimination of the user'});
            });
    }

}
