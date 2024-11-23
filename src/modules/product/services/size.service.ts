import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeEntity } from '../entities/size.entity';
import { CreateSizeDto } from '../dto/create-size-dto';

@Injectable()
export class SizeService {

    constructor(
        @InjectRepository(SizeEntity)
        private readonly repo: Repository<SizeEntity>
    ){}

    async getAll(): Promise<SizeEntity[]> {
        return await this.repo.find();
    }

    async getById(id: number): Promise<SizeEntity> {
        return await this.repo.findOne({
            where: {id: id},
        });
    }

    async createSize(newSize: CreateSizeDto): Promise<SizeEntity> {
        const news = new SizeEntity();
        news.number = newSize.number;
        return await this.repo.save(news);
    }

    async updateSize(id: number, modSize: CreateSizeDto): Promise<SizeEntity> {
        const sizeUpd: SizeEntity = await this.repo.findOneBy({id:id});
        sizeUpd.number = modSize.number;
        return await this.repo.save(sizeUpd);
    }

    async deleteSize(id: number): Promise<any> {
        return await this.repo.delete(id);
    }
}
