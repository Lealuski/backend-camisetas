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
        return await this.repo.find({
            relations: {
                print_orders: true,
            }
        });
    }

    async getById(id: number): Promise<ColorEntity> {
        return await this.repo.findOne({
            where: {id: id},
            relations: {
                print_orders: true,
            }
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

    async createColors(newColors: CreateColorDto[]): Promise<ColorEntity[]> {
        const colorsToSave: ColorEntity[] = [];
        for (const newColor of newColors) {
            const newc = new ColorEntity();
            newc.name = newColor.name;
            newc.hexa_rgb = newColor.hexa_rgb;
            colorsToSave.push(newc);
        }
        return this.repo.save(colorsToSave);
    }    
    
    async deleteAll(): Promise<void> {
        await this.repo.clear();
    }
}
