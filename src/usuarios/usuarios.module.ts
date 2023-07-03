import { UsuarioEntity } from './usuarios.entity';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { UsuarioController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
    imports: [TypeOrmModule.forFeature([UsuarioEntity, UsuarioModule])],
    providers: [UsuarioService],
    controllers: [UsuarioController]
})
export class UsuarioModule { }