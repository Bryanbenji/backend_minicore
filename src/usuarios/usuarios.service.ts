import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuarios.entity";
import { UsuarioRepository } from "./usuarios.repository";
import { MessageDto } from "src/common/message.dto";
import { UsuarioDto } from "./dto/usuarios.dto";



@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: UsuarioRepository,

    ) { }

    async getAll(): Promise<UsuarioEntity[]> {
        const list = await this.usuarioRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(id: number): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id }
     }); 
        if (!usuario) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return usuario;
    }

    async findByNombre(nombre: string): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.findOne({where: { nombre: nombre }});
        return usuario;
    }

    async create(dto: UsuarioDto): Promise<any> {
        const { nombre } = dto;
        const exists = await this.findByNombre(nombre);
        if (exists) {
            throw new ConflictException(
              new MessageDto('Ya existe un usuario con ese nombre'),
            );
          }
        const usuario = this.usuarioRepository.create(dto);
        await this.usuarioRepository.save(usuario);
        return new MessageDto(`usuario ${usuario.nombre} creado`);
    }

    async update(id: number, dto: UsuarioDto): Promise<any> {
        const usuario = await this.findById(id);
        if (!usuario)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombre(dto.nombre);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese usuario ya existe'));
        dto.nombre ? usuario.nombre = dto.nombre : usuario.nombre = usuario.nombre;
        dto.telefono ? usuario.telefono = dto.telefono : usuario.telefono = usuario.telefono;
        dto.email ? usuario.email = dto.email : usuario.email = usuario.email;
        await this.usuarioRepository.save(usuario);
        return new MessageDto(`usuario ${usuario.nombre} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const usuario = await this.findById(id);
        await this.usuarioRepository.delete(usuario);
        return new MessageDto(`usuario ${usuario.nombre} eliminado`);
    }
}