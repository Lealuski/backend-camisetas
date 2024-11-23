import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { PrintService } from '../services/print.service';
import { CreatePrintDto } from '../dto/create-print-dto';

@Controller('print')
export class PrintController {

    constructor(private service: PrintService){}

    @Post()
    create(@Body() dto : CreatePrintDto, @Res() response){
        this.service.createPrint(dto)
            .then( print => {
                response.status(HttpStatus.CREATED).json(print);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the creation of the print: ${e}`});
            });
    }

    @Post('bulk')
    createMany(@Body() printsDto: CreatePrintDto[], @Res() response) {
        this.service.createPrints(printsDto)
            .then(prints => {
                response.status(HttpStatus.CREATED).json(prints);
            })
            .catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    { mensaje: `Error in the creation of prints: ${e}` }
                );
            });
    }

    @Get()
    getAll(@Res() response){
        this.service.getAll()
            .then( printsList => {
                response.status(HttpStatus.OK).json(printsList);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the prints: ${e}`});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idPrint){
        this.service.getById(idPrint)
            .then( print => {
                response.status(HttpStatus.OK).json(print);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the print by id: ${e}`});
            });
    }

    @Put(':id')
    update(@Body() updatePrintDto: CreatePrintDto, @Res() response, @Param('id') idPrint : number){
        this.service.updatePrint(idPrint, updatePrintDto)
            .then(printUpdated => {
                response.status(HttpStatus.OK).json(printUpdated);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the modification of the print: ${e}`});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idPrint : number){
        this.service.deletePrint(idPrint)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of the print: ${e}`});
            });
    }

    @Delete()
    deleteAll(@Res() response){
        this.service.deleteAll()
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of all the prints: ${e}`});
            });
    }
}
