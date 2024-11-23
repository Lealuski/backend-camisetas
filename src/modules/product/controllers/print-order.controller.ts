import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { PrintOrderService } from '../services/print-order.service';
import { CreatePrintOrderDto } from '../dto/create-print-order-dto';

@Controller('print-order')
export class PrintOrderController {

    constructor(private service: PrintOrderService){}

    @Post()
    create(@Body() dto : CreatePrintOrderDto, @Res() response){
        this.service.createPrintOrder(dto)
            .then( printOrder => {
                response.status(HttpStatus.CREATED).json(printOrder);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the creation of the print Order: ${e}`});
            });
    }

    @Post('bulk')
    createMany(@Body() printOrdersDto: CreatePrintOrderDto[], @Res() response) {
        this.service.createPrintOrders(printOrdersDto)
            .then(printOrders => {
                response.status(HttpStatus.CREATED).json(printOrders);
            })
            .catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    { mensaje: `Error in the creation of print Orders: ${e}` }
                );
            });
    }

    @Get()
    getAll(@Res() response){
        this.service.getAll()
            .then( printOrdersList => {
                response.status(HttpStatus.OK).json(printOrdersList);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the print Orders: ${e}`});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idPrintOrder){
        this.service.getById(idPrintOrder)
            .then( printOrder => {
                response.status(HttpStatus.OK).json(printOrder);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the print Order by id: ${e}`});
            });
    }

    @Put(':id')
    update(@Body() updatePrintOrderDto: CreatePrintOrderDto, @Res() response, @Param('id') idPrintOrder : number){
        this.service.updatePrintOrder(idPrintOrder, updatePrintOrderDto)
            .then(printOrderUpdated => {
                response.status(HttpStatus.OK).json(printOrderUpdated);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the modification of the print Order: ${e}`});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idPrintOrder : number){
        this.service.deletePrintOrder(idPrintOrder)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of the print Order: ${e}`});
            });
    }

    @Delete()
    deleteAll(@Res() response){
        this.service.deleteAll()
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of all the print Orders: ${e}`});
            });
    }
}
