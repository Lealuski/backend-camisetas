import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaterialEntity } from '../entities/material.entity';
import { CreateMaterialDto } from '../dto/create-material-dto';

@Injectable()
export class MaterialService {

    constructor(
        @InjectRepository(MaterialEntity)
        private readonly repo: Repository<MaterialEntity>
    ){}
    
    async getAll(): Promise<MaterialEntity[]> {
        return await this.repo.find();
    }

    async getById(id: number): Promise<MaterialEntity> {
        return await this.repo.findOne({
            where: {id: id},
        });
    }

    async createMaterial(newMaterial: CreateMaterialDto): Promise<MaterialEntity> {
        const newm = new MaterialEntity();
        newm.name = newMaterial.name;
        newm.price = newMaterial.price;
        return await this.repo.save(newm);
    }

    async updateMaterial(id: number, modMaterial: CreateMaterialDto): Promise<MaterialEntity> {
        const materialUpd: MaterialEntity = await this.repo.findOneBy({id:id});
        materialUpd.name = modMaterial.name;
        materialUpd.price = modMaterial.price;
        return await this.repo.save(materialUpd);
    }

    async deleteMaterial(id: number): Promise<any> {
        return await this.repo.delete(id);
    }
}
