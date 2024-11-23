import { Module } from '@nestjs/common';
import { ColorController } from './controllers/color.controller';
import { MaterialController } from './controllers/material.controller';
import { SizeController } from './controllers/size.controller';
import { ThemeController } from './controllers/theme.controller';
import { UserController } from './controllers/user.controller';
import { ColorService } from './services/color.service';
import { MaterialService } from './services/material.service';
import { SizeService } from './services/size.service';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeEntity } from './entities/theme.entity';
import { ColorEntity } from './entities/color.entity';
import { MaterialEntity } from './entities/material.entity';
import { SizeEntity } from './entities/size.entity';
import { PrintService } from './services/print.service';
import { PrintController } from './controllers/print.controller';
import { ImageService } from './services/image.service';
import { ImageController } from './controllers/image.controller';

@Module({
    imports: [TypeOrmModule.forFeature([
        ColorEntity,
        MaterialEntity,
        SizeEntity,
        ThemeEntity,
        UserEntity,
    ])],
    controllers: [
        ColorController, 
        MaterialController, 
        SizeController, 
        ThemeController, 
        UserController, 
        PrintController, 
        ImageController,
    ],
    providers: [
        ColorService, 
        MaterialService, 
        PrintService,
        SizeService, 
        ThemeService, 
        UserService, 
        ImageService,
    ],
})
export class ProductModule {}
