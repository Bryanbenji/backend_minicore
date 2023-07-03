import { VentaEntity } from './ventas.entity';
import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuarios/usuarios.entity';
import { UsuarioModule } from 'src/usuarios/usuarios.module';


@Module({
    imports: [TypeOrmModule.forFeature([VentaEntity, VentasModule]), TypeOrmModule.forFeature([UsuarioEntity, UsuarioModule])],
    providers: [VentasService],
    controllers: [VentasController]
})
export class VentasModule { }