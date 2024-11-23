import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColorEntity } from '../entities/color.entity';
import { CreateColorDto } from '../dto/create-color-dto';

@Injectable()
export class ColorService {

    constructor(
        @InjectRepository(ColorEntity)
        private readonly repo: Repository<ColorEntity>
    ){}

    async getAll(): Promise<ColorEntity[]> {
        return await this.repo.find();
    }

    async getById(id: number): Promise<ColorEntity> {
        return await this.repo.findOne({
            where: {id: id},
        });
    }

    async createColor(newColor: CreateColorDto): Promise<ColorEntity> {
        const newc = new ColorEntity();
        newc.name = newColor.name;
        newc.hexa_rgb = newColor.hexa_rgb;
        return await this.repo.save(newc);
    }

    async updateColor(id: number, modColor: CreateColorDto): Promise<ColorEntity> {
        const colorUpd: ColorEntity = await this.repo.findOneBy({id:id});
        colorUpd.name = modColor.name;
        colorUpd.hexa_rgb = modColor.hexa_rgb;
        return await this.repo.save(colorUpd);
    }

    async deleteColor(id: number): Promise<any> {
        return await this.repo.delete(id);
    }
}
