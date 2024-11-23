import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ThemeService } from '../services/theme.service';
import { CreateThemeDto } from '../dto/create-theme-dto';

@Controller('theme')
export class ThemeController {

    constructor(private themeServ: ThemeService){}

    @Post()
    create(@Body() dto : CreateThemeDto, @Res() response){
        this.themeServ.createTheme(dto)
            .then( theme => {
                response.status(HttpStatus.CREATED).json(theme);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the creation of the theme: ${e}`});
            });
    }

    @Get()
    getAll(@Res() response){
        this.themeServ.getAll()
            .then( themesList => {
                response.status(HttpStatus.OK).json(themesList);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the themes: ${e}`});
            });
    }

    @Get(':id')
    getById(@Res() response,@Param('id') idTheme){
        this.themeServ.getById(idTheme)
            .then( theme => {
                response.status(HttpStatus.OK).json(theme);
            }).catch( (e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the getting of the theme by id: ${e}`});
            });
    }

    @Put(':id')
    update(@Body() dto: CreateThemeDto, @Res() response, @Param('id') idTheme : number){
        this.themeServ.updateTheme(idTheme, dto)
            .then(themeUpdated => {
                response.status(HttpStatus.OK).json(themeUpdated);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the modification of the theme: ${e}`});
            });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idTheme : number){
        this.themeServ.deleteTheme(idTheme)
            .then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch((e) => {
                response.status(HttpStatus.FORBIDDEN).json(
                    {mensaje: `Error in the elimination of the theme: ${e}`});
            });
    }
}
