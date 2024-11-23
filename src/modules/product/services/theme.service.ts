import { Injectable } from '@nestjs/common';
import { ThemeEntity } from '../entities/theme.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateThemeDto } from '../dto/create-theme-dto';

@Injectable()
export class ThemeService {
    
    constructor(
        @InjectRepository(ThemeEntity)
        private readonly repo: Repository<ThemeEntity>
    ){}

    async getAll(): Promise<ThemeEntity[]> {
        return await this.repo.find();
    }

    async getById(id: number): Promise<ThemeEntity> {
        return await this.repo.findOne({
            where: {id: id},
        });
    }

    async createTheme(newTheme: CreateThemeDto): Promise<ThemeEntity> {
        const newt = new ThemeEntity();
        newt.name = newTheme.name;
        return await this.repo.save(newt);
    }

    async updateTheme(id: number, modTheme: CreateThemeDto): Promise<ThemeEntity> {
        const themeUpd: ThemeEntity = await this.repo.findOneBy({id:id});
        themeUpd.name = modTheme.name;
        return await this.repo.save(themeUpd);
    }

    async deleteTheme(id: number): Promise<any> {
        return await this.repo.delete(id);
    }
}
