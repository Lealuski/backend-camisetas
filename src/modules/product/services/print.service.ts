import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrintEntity } from '../entities/print.entity';
import { CreatePrintDto } from '../dto/create-print-dto';
import { ThemeEntity } from '../entities/theme.entity';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class PrintService {

    constructor(
        @InjectRepository(PrintEntity)
        private readonly printRepo: Repository<PrintEntity>,

        @InjectRepository(ThemeEntity)
        private readonly themeRepo: Repository<ThemeEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) {}

    async getAll(): Promise<PrintEntity[]> {
        return await this.printRepo.find({
            relations: {
                theme: true,
                author: true,
                images: true,
            }
        });
    }

    async getById(idPrint: number): Promise<PrintEntity> {
        return await this.printRepo.findOne({
            where: { id:idPrint },
            relations: {
                theme: true,
                author: true,
                images: true,
            }
        });
    }

    async createPrint(newPrint: CreatePrintDto): Promise<PrintEntity> {
        const themeFound = await this.themeRepo.findOne({
            where: {id: newPrint.theme_id}
        })
        if(!themeFound){
            throw new Error('Theme not found in creation of print');
        }

        const authorFound = await this.userRepo.findOne({
            where: {id: newPrint.author_id}
        })
        if(!authorFound){
            throw new Error('Author not found in creation of print');
        }

        const print = new PrintEntity();
        print.name = newPrint.name;
        print.state = newPrint.state;
        print.description = newPrint.description;
        print.author = authorFound;
        print.theme = themeFound;
        return await this.printRepo.save(print);
    }

    async updatePrint(idPrint: number, modifiedPrint: CreatePrintDto): Promise<PrintEntity> {
        const themeFound = await this.themeRepo.findOne({
            where: {id: modifiedPrint.theme_id}
        })
        if(!themeFound){
            throw new Error('Theme not found in update of print');
        }

        const authorFound = await this.userRepo.findOne({
            where: {id: modifiedPrint.author_id}
        })
        if(!authorFound){
            throw new Error('Author not found in update of print');
        }

        const printFound: PrintEntity = await this.printRepo.findOneBy({id:idPrint});
        printFound.name = modifiedPrint.name;
        printFound.state = modifiedPrint.state;
        printFound.description = modifiedPrint.description;
        printFound.author = authorFound;
        printFound.theme = themeFound;
        return await this.printRepo.save(printFound);
    }

    async deletePrint(idPrint: number): Promise<any> {
        return await this.printRepo.delete(idPrint);
    }

    async createPrints(newPrints: CreatePrintDto[]): Promise<PrintEntity[]> {
        const printsToSave: PrintEntity[] = [];
        for (const newPrint of newPrints) {
            const themeFound = await this.themeRepo.findOne({
                where: {id: newPrint.theme_id}
            })
            if(!themeFound){
                throw new Error('Theme not found in creation of print');
            }
            const authorFound = await this.userRepo.findOne({
                where: {id: newPrint.author_id}
            })
            if(!authorFound){
                throw new Error('Author not found in creation of print');
            }
            const print = new PrintEntity();
            print.name = newPrint.name;
            print.state = newPrint.state;
            print.description = newPrint.description;
            print.author = authorFound;
            print.theme = themeFound;
            printsToSave.push(print);
        }
        return this.printRepo.save(printsToSave);
    }    
    
    async deleteAll(): Promise<void> {
        await this.printRepo.clear();
    }
}
