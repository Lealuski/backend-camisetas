import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { Response } from 'express';

@Controller()
export class PathController {
    @Get('/')
    getIndex(@Res() res: Response) {
        res.sendFile(join(__dirname, '..', '..', '..', 'public', 'index.html')); // Ajusta el path relativo
        console.log('index.html');
    }
}
