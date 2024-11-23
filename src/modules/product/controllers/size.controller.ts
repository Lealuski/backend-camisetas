import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { SizeService } from '../services/size.service';
import { CreateSizeDto } from '../dto/create-size-dto';

@Controller('size')
export class SizeController {

    constructor(private service: SizeService){}

    @Post()
    create(@Body() dto : CreateSizeDto, @Res() response){
        this.service.createSize(dto)
            .then( size => {
                response.status(HttpStatus.CREATED).json(size);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the creation of the size: ${e}`});
            });
    }

    @Get()
    getAll(@Res() response){
        this.service.getAll()
            .then( sizesList => {
                response.status(HttpStatus.OK).json(sizesList);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the sizes: ${e}`});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idSize){
        this.service.getById(idSize)
            .then( size => {
                response.status(HttpStatus.OK).json(size);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the size by id: ${e}`});
            });
    }

    @Put(':id')
    update(@Body() dto: CreateSizeDto, @Res() response, @Param('id') idSize : number){
        this.service.updateSize(idSize, dto)
            .then(sizeUpdated => {
                response.status(HttpStatus.OK).json(sizeUpdated);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the modification of the size: ${e}`});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idSize : number){
        this.service.deleteSize(idSize)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of the size: ${e}`});
            });
    }

    @Post('bulk')
    createMany(@Body() dtos: CreateSizeDto[], @Res() response) {
        this.service.createSizes(dtos)
            .then(sizes => {
                response.status(HttpStatus.CREATED).json(sizes);
            })
            .catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    { mensaje: `Error in the creation of sizes: ${e}` }
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
                    {mensaje: `Error in the elimination of all the sizes: ${e}`});
            });
    }
}
