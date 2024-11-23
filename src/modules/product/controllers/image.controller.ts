import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ImageService } from '../services/image.service';
import { CreateImageDto } from '../dto/create-image-dto';

@Controller('image')
export class ImageController {

    constructor(private service: ImageService){}

    @Post()
    create(@Body() dto : CreateImageDto, @Res() response){
        this.service.createImage(dto)
            .then( image => {
                response.status(HttpStatus.CREATED).json(image);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the creation of the image: ${e}`});
            });
    }

    @Post('bulk')
    createMany(@Body() imagesDto: CreateImageDto[], @Res() response) {
        this.service.createImages(imagesDto)
            .then(images => {
                response.status(HttpStatus.CREATED).json(images);
            })
            .catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    { mensaje: `Error in the creation of images: ${e}` }
                );
            });
    }

    @Get()
    getAll(@Res() response){
        this.service.getAll()
            .then( imagesList => {
                response.status(HttpStatus.OK).json(imagesList);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the images: ${e}`});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idImage){
        this.service.getById(idImage)
            .then( image => {
                response.status(HttpStatus.OK).json(image);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the image by id: ${e}`});
            });
    }

    @Put(':id')
    update(@Body() updateImageDto: CreateImageDto, @Res() response, @Param('id') idImage : number){
        this.service.updateImage(idImage, updateImageDto)
            .then(imageUpdated => {
                response.status(HttpStatus.OK).json(imageUpdated);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the modification of the image: ${e}`});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idImage : number){
        this.service.deleteImage(idImage)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of the image: ${e}`});
            });
    }

    @Delete()
    deleteAll(@Res() response){
        this.service.deleteAll()
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of all the images: ${e}`});
            });
    }
}
