import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ColorService } from '../services/color.service';
import { CreateColorDto } from '../dto/create-color-dto';

@Controller('color')
export class ColorController {

    constructor(private service: ColorService){}
    
    @Post()
    create(@Body() dto : CreateColorDto, @Res() response){
        this.service.createColor(dto)
            .then( color => {
                response.status(HttpStatus.CREATED).json(color);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the creation of the color: ${e}`});
            });
    }

    @Get()
    getAll(@Res() response){
        this.service.getAll()
            .then( colorsList => {
                response.status(HttpStatus.OK).json(colorsList);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the colors: ${e}`});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idColor){
        this.service.getById(idColor)
            .then( color => {
                response.status(HttpStatus.OK).json(color);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the color by id: ${e}`});
            });
    }

    @Put(':id')
    update(@Body() dto: CreateColorDto, @Res() response, @Param('id') idColor : number){
        this.service.updateColor(idColor, dto)
            .then(colorUpdated => {
                response.status(HttpStatus.OK).json(colorUpdated);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the modification of the color: ${e}`});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idColor : number){
        this.service.deleteColor(idColor)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of the color: ${e}`});
            });
    }

    @Post('bulk')
    createMany(@Body() dtos: CreateColorDto[], @Res() response) {
        this.service.createColors(dtos)
            .then(colors => {
                response.status(HttpStatus.CREATED).json(colors);
            })
            .catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    { mensaje: `Error in the creation of colors: ${e}` }
                );
            });
    }

    @Delete()
    deleteAll(@Res() response){
        this.service.deleteAll()
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of all the colors: ${e}`});
            });
    }
}
