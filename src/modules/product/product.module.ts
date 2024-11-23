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

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ThemeEntity])],
    controllers: [ColorController, MaterialController, SizeController, ThemeController, UserController],
    providers: [ColorService, MaterialService, SizeService, ThemeService, UserService],
})
export class ProductModule {}
