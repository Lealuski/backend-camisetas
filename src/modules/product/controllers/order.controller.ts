import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order-dto';

@Controller('order')
export class OrderController {
    
    constructor(private service: OrderService){}

    @Post()
    create(@Body() dto : CreateOrderDto, @Res() response){
        this.service.createOrder(dto)
            .then( order => {
                response.status(HttpStatus.CREATED).json(order);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the creation of the order: ${e}`});
            });
    }

    @Post('bulk')
    createMany(@Body() ordersDto: CreateOrderDto[], @Res() response) {
        this.service.createOrders(ordersDto)
            .then(orders => {
                response.status(HttpStatus.CREATED).json(orders);
            })
            .catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    { mensaje: `Error in the creation of orders: ${e}` }
                );
            });
    }

    @Get()
    getAll(@Res() response){
        this.service.getAll()
            .then( ordersList => {
                response.status(HttpStatus.OK).json(ordersList);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the orders: ${e}`});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idOrder){
        this.service.getById(idOrder)
            .then( order => {
                response.status(HttpStatus.OK).json(order);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the order by id: ${e}`});
            });
    }

    @Put(':id')
    update(@Body() updateOrderDto: CreateOrderDto, @Res() response, @Param('id') idOrder : number){
        this.service.updateOrder(idOrder, updateOrderDto)
            .then(orderUpdated => {
                response.status(HttpStatus.OK).json(orderUpdated);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the modification of the order: ${e}`});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idOrder : number){
        this.service.deleteOrder(idOrder)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of the order: ${e}`});
            });
    }

    @Delete()
    deleteAll(@Res() response){
        this.service.deleteAll()
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of all the orders: ${e}`});
            });
    }
}
