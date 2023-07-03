import { MessageDto } from 'src/common/message.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VentasDto } from './dto/ventas.dto';
import { VentaEntity } from './ventas.entity';
import { VentasRepository } from './ventas.repository';
import { UsuarioRepository } from 'src/usuarios/usuarios.repository';
import { UsuarioEntity } from 'src/usuarios/usuarios.entity';
import { Between } from 'typeorm';



@Injectable()
export class VentasService {

    constructor(
        @InjectRepository(VentaEntity)
        private ventasRepository: VentasRepository,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: UsuarioRepository
    ) { }

    async getAll(): Promise<VentaEntity[]> {
        const list = await this.ventasRepository.find({ relations: ['usuario'] });
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }
    
    async findById(id: number): Promise<VentaEntity> {
        const ventas = await this.ventasRepository.findOne({
            where: { id }
     }); 
        if (!ventas) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return ventas;
    }

    async findByNombre(nombre: string): Promise<VentaEntity> {
        const ventas = await this.ventasRepository.findOne({where: { producto: nombre }});
        return ventas;
    }

    async create(dto: VentasDto ): Promise<any> {
        const { producto, usuarioId} = dto;
        const exists = await this.findByNombre(producto);
        const usuarios = await this.usuarioRepository.findOne({ where: { id:  usuarioId } });
        if (!usuarios) {
            throw new NotFoundException(`Usuario con id ${usuarioId} no encontrada`);
          }
        if (exists) throw new BadRequestException(new MessageDto('ese nombre ya existe'));
        const ventas = this.ventasRepository.create(dto);
        ventas.usuario = usuarios;
        await this.ventasRepository.save(ventas);
        return new MessageDto(`venta ${ventas.usuario} creado`);
    }

    async update(id: number, dto: VentasDto): Promise<any> {
        const ventas = await this.findById(id);
        if (!ventas)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombre(dto.producto);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese ventas ya existe'));
        dto.fechaVenta ? ventas.fechaVenta = dto.fechaVenta : ventas.fechaVenta = ventas.fechaVenta;
        dto.producto ? ventas.producto = dto.producto : ventas.producto = ventas.producto;
        dto.cuotaMonto ? ventas.cuotaMonto = dto.cuotaMonto : ventas.cuotaMonto = ventas.cuotaMonto;
        dto.usuarioId ? ventas.usuario.id = dto.usuarioId : ventas.usuario = ventas.usuario;
        await this.ventasRepository.save(ventas);
        return new MessageDto(`ventas ${ventas.producto} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const ventas = await this.findById(id);
        await this.ventasRepository.delete(ventas);
        return new MessageDto(`ventas ${ventas.producto} eliminado`);
    }



    async getReportBetweenDates(beginDateParam: Date, endDateParam: Date) {
        const beginDate = new Date(beginDateParam);
        const endDate = new Date(endDateParam);
        const report = [];
    
        const allVentas = await this.ventasRepository.find({
            where: {
                fechaVenta: Between(beginDate, endDate),
            },
            relations: ['usuario'],
        });
    
        const uniqueUsuarios = [...new Set(allVentas.map((venta) => venta.usuario.nombre))];
    
        for (const usuario of uniqueUsuarios) {
            const usuarioVentas = allVentas.filter((venta) => venta.usuario.nombre === usuario);
            const totalMonto = usuarioVentas.reduce((sum, venta) => sum + venta.cuotaMonto, 0);
    
            report.push({ nombreUsuario: usuario, montoTotal: totalMonto });
        }
    
        return report;
    }
    
}