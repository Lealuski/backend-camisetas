import { Controller } from '@nestjs/common';

@Controller('size')
export class SizeController {
    readonly id: number;
    readonly number: string;
}
