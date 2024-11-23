import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from '../entities/image.entity';
import { PrintEntity } from '../entities/print.entity';
import { CreateImageDto } from '../dto/create-image-dto';

@Injectable()
export class ImageService {

    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepo: Repository<ImageEntity>,

        @InjectRepository(PrintEntity)
        private readonly printRepo: Repository<PrintEntity>,
    ) {}

    async getAll(): Promise<ImageEntity[]> {
        return await this.imageRepo.find({
            relations: {
                print: true,
                back_print_orders: true,
                front_print_orders: true,
                shoulders_print_orders: true,
            }
        });
    }

    async getById(idImage: number): Promise<ImageEntity> {
        return await this.imageRepo.findOne({
            where: { id:idImage },
            relations: {
                print: true,
                back_print_orders: true,
                front_print_orders: true,
                shoulders_print_orders: true,
            }
        });
    }

    async createImage(newImage: CreateImageDto): Promise<ImageEntity> {
        const printFound = await this.printRepo.findOne({
            where: {id: newImage.print_id}
        })
        if(!printFound){
            throw new Error('Print not found in creation of image');
        }

        const image = new ImageEntity();
        image.file_url = newImage.file_url;
        image.location = newImage.location;
        image.sales_number = newImage.sales_number;
        image.print = printFound;

        return await this.imageRepo.save(image);
    }

    async updateImage(idImage: number, modifiedImage: CreateImageDto): Promise<ImageEntity> {
        const printFound = await this.printRepo.findOne({
            where: {id: modifiedImage.print_id}
        })
        if(!printFound){
            throw new Error('Print not found in update of image');
        }

        const imageFound: ImageEntity = await this.imageRepo.findOneBy({id:idImage});
        imageFound.file_url = modifiedImage.file_url;
        imageFound.location = modifiedImage.location;
        imageFound.sales_number = modifiedImage.sales_number;
        imageFound.print = printFound;

        return await this.imageRepo.save(imageFound);
    }

    async deleteImage(idImage: number): Promise<any> {
        return await this.imageRepo.delete(idImage);
    }

    async createImages(newImages: CreateImageDto[]): Promise<ImageEntity[]> {
        const imagesToSave: ImageEntity[] = [];
    
        for (const newImage of newImages) {
            const printFound = await this.printRepo.findOne({
                where: {id: newImage.print_id}
            })
            if(!printFound){
                throw new Error('Print not found in creation of images');
            }
    
            const image = new ImageEntity();
            image.file_url = newImage.file_url;
            image.location = newImage.location;
            image.sales_number = newImage.sales_number;
            image.print = printFound;

            imagesToSave.push(image);
        }
    
        return this.imageRepo.save(imagesToSave);
    }    
    
    async deleteAll(): Promise<void> {
        await this.imageRepo.clear();
    }
}
