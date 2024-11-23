import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrintOrderEntity } from '../entities/print-order.entity';
import { ThemeEntity } from '../entities/theme.entity';
import { ImageEntity } from '../entities/image.entity';
import { SizeEntity } from '../entities/size.entity';
import { ColorEntity } from '../entities/color.entity';
import { MaterialEntity } from '../entities/material.entity';
import { OrderEntity } from '../entities/order.entity';
import { CreatePrintOrderDto } from '../dto/create-print-order-dto';

@Injectable()
export class PrintOrderService {

    constructor(
        @InjectRepository(PrintOrderEntity)
        private readonly printOrderRepo: Repository<PrintOrderEntity>,

        @InjectRepository(ImageEntity)
        private readonly imageRepo: Repository<ImageEntity>,

        @InjectRepository(SizeEntity)
        private readonly sizeRepo: Repository<SizeEntity>,

        @InjectRepository(ColorEntity)
        private readonly colorRepo: Repository<ColorEntity>,

        @InjectRepository(MaterialEntity)
        private readonly materialRepo: Repository<MaterialEntity>,

        @InjectRepository(OrderEntity)
        private readonly orderRepo: Repository<OrderEntity>,
    ) {}

    async getAll(): Promise<PrintOrderEntity[]> {
        return await this.printOrderRepo.find({
            relations: {
                front_image: true,
                back_image: true,
                shoulders_image: true,
                size: true,
                color: true,
                material: true,
                order: true,
            }
        });
    }

    async getById(idPrintOrder: number): Promise<PrintOrderEntity> {
        return await this.printOrderRepo.findOne({
            where: { id:idPrintOrder },
            relations: {
                front_image: true,
                back_image: true,
                shoulders_image: true,
                size: true,
                color: true,
                material: true,
                order: true,
            }
        });
    }

    async createPrintOrder(newPrintOrder: CreatePrintOrderDto): Promise<PrintOrderEntity> {
        const frontImageFound = await this.imageRepo.findOne({
            where: {id: newPrintOrder.front_image_id}
        })
        if(!frontImageFound){
            throw new Error('Front Image not found in creation of print order');
        }
        const backImageFound = await this.imageRepo.findOne({
            where: {id: newPrintOrder.back_image_id}
        })
        if(!backImageFound){
            throw new Error('Back Image not found in creation of print order');
        }
        const shouldersImageFound = await this.imageRepo.findOne({
            where: {id: newPrintOrder.shoulders_image_id}
        })
        if(!shouldersImageFound){
            throw new Error('Shoulders Image not found in creation of print order');
        }

        const sizeFound = await this.sizeRepo.findOne({
            where: {id: newPrintOrder.size_id}
        })
        if(!sizeFound){
            throw new Error('Size not found in creation of print order');
        }

        const colorFound = await this.colorRepo.findOne({
            where: {id: newPrintOrder.color_id}
        })
        if(!colorFound){
            throw new Error('Color not found in creation of print order');
        }

        const materialFound = await this.materialRepo.findOne({
            where: {id: newPrintOrder.material_id}
        })
        if(!materialFound){
            throw new Error('Material not found in creation of print order');
        }

        const orderFound = await this.orderRepo.findOne({
            where: {id: newPrintOrder.order_id}
        })
        if(!orderFound){
            throw new Error('Order not found in creation of print order');
        }

        const printOrder = new PrintOrderEntity();
        printOrder.amount = newPrintOrder.amount;
        printOrder.gross_price = newPrintOrder.gross_price;
        printOrder.front_image = frontImageFound;
        printOrder.back_image = backImageFound;
        printOrder.shoulders_image = shouldersImageFound;
        printOrder.size = sizeFound;
        printOrder.color = colorFound;
        printOrder.material = materialFound;
        printOrder.order = orderFound;
        
        return await this.printOrderRepo.save(printOrder);
    }

    async updatePrintOrder(id: number, modified: CreatePrintOrderDto): Promise<PrintOrderEntity> {
        const frontImageFound = await this.imageRepo.findOne({
            where: {id: modified.front_image_id}
        })
        if(!frontImageFound){
            throw new Error('Front Image not found in update of print order');
        }
        const backImageFound = await this.imageRepo.findOne({
            where: {id: modified.back_image_id}
        })
        if(!backImageFound){
            throw new Error('Back Image not found in update of print order');
        }
        const shouldersImageFound = await this.imageRepo.findOne({
            where: {id: modified.shoulders_image_id}
        })
        if(!shouldersImageFound){
            throw new Error('Shoulders Image not found in update of print order');
        }

        const sizeFound = await this.sizeRepo.findOne({
            where: {id: modified.size_id}
        })
        if(!sizeFound){
            throw new Error('Size not found in update of print order');
        }

        const colorFound = await this.colorRepo.findOne({
            where: {id: modified.color_id}
        })
        if(!colorFound){
            throw new Error('Color not found in update of print order');
        }

        const materialFound = await this.materialRepo.findOne({
            where: {id: modified.material_id}
        })
        if(!materialFound){
            throw new Error('Material not found in update of print order');
        }

        const orderFound = await this.orderRepo.findOne({
            where: {id: modified.order_id}
        })
        if(!orderFound){
            throw new Error('Order not found in update of print order');
        }

        const printOrderFound: PrintOrderEntity = await this.printOrderRepo.findOneBy({id:id});
        printOrderFound.amount = modified.amount;
        printOrderFound.gross_price = modified.gross_price;
        printOrderFound.front_image = frontImageFound;
        printOrderFound.back_image = backImageFound;
        printOrderFound.shoulders_image = shouldersImageFound;
        printOrderFound.size = sizeFound;
        printOrderFound.color = colorFound;
        printOrderFound.material = materialFound;
        printOrderFound.order = orderFound;
        
        return await this.printOrderRepo.save(printOrderFound);
    }

    async deletePrintOrder(idPrintOrder: number): Promise<any> {
        return await this.printOrderRepo.delete(idPrintOrder);
    }

    async createPrintOrders(newPrintOrders: CreatePrintOrderDto[]): Promise<PrintOrderEntity[]> {
        const printOrdersToSave: PrintOrderEntity[] = [];
    
        for (const newPrintOrder of newPrintOrders) {
            const frontImageFound = await this.imageRepo.findOne({
                where: {id: newPrintOrder.front_image_id}
            })
            if(!frontImageFound){
                throw new Error('Front Image not found in creation of print order');
            }
            const backImageFound = await this.imageRepo.findOne({
                where: {id: newPrintOrder.back_image_id}
            })
            if(!backImageFound){
                throw new Error('Back Image not found in creation of print order');
            }
            const shouldersImageFound = await this.imageRepo.findOne({
                where: {id: newPrintOrder.shoulders_image_id}
            })
            if(!shouldersImageFound){
                throw new Error('Shoulders Image not found in creation of print order');
            }
    
            const sizeFound = await this.sizeRepo.findOne({
                where: {id: newPrintOrder.size_id}
            })
            if(!sizeFound){
                throw new Error('Size not found in creation of print order');
            }
    
            const colorFound = await this.colorRepo.findOne({
                where: {id: newPrintOrder.color_id}
            })
            if(!colorFound){
                throw new Error('Color not found in creation of print order');
            }
    
            const materialFound = await this.materialRepo.findOne({
                where: {id: newPrintOrder.material_id}
            })
            if(!materialFound){
                throw new Error('Material not found in creation of print order');
            }
    
            const orderFound = await this.orderRepo.findOne({
                where: {id: newPrintOrder.order_id}
            })
            if(!orderFound){
                throw new Error('Order not found in creation of print order');
            }
    
            const printOrder = new PrintOrderEntity();
            printOrder.amount = newPrintOrder.amount;
            printOrder.gross_price = newPrintOrder.gross_price;
            printOrder.front_image = frontImageFound;
            printOrder.back_image = backImageFound;
            printOrder.shoulders_image = shouldersImageFound;
            printOrder.size = sizeFound;
            printOrder.color = colorFound;
            printOrder.material = materialFound;
            printOrder.order = orderFound;

            printOrdersToSave.push(printOrder);
        }
    
        return this.printOrderRepo.save(printOrdersToSave);
    }    
    
    async deleteAll(): Promise<void> {
        await this.printOrderRepo.clear();
    }
}
