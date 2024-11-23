import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { MaterialService } from '../services/material.service';
import { CreateMaterialDto } from '../dto/create-material-dto';

@Controller('material')
export class MaterialController {
    constructor(private service: MaterialService){}

    @Post()
    create(@Body() dto : CreateMaterialDto, @Res() response){
        this.service.createMaterial(dto)
            .then( material => {
                response.status(HttpStatus.CREATED).json(material);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the creation of the material: ${e}`});
            });
    }

    @Get()
    getAll(@Res() response){
        this.service.getAll()
            .then( materialsList => {
                response.status(HttpStatus.OK).json(materialsList);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the materials: ${e}`});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idMaterial){
        this.service.getById(idMaterial)
            .then( material => {
                response.status(HttpStatus.OK).json(material);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the material by id: ${e}`});
            });
    }

    @Put(':id')
    update(@Body() dto: CreateMaterialDto, @Res() response, @Param('id') idMaterial : number){
        this.service.updateMaterial(idMaterial, dto)
            .then(matUpdated => {
                response.status(HttpStatus.OK).json(matUpdated);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the modification of the material: ${e}`});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMaterial : number){
        this.service.deleteMaterial(idMaterial)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of the material: ${e}`});
            });
    }
}
