import { MessageDto } from './../common/message.dto';
import { UsuarioService } from './usuarios.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { UsuarioDto } from './dto/usuarios.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) {}

    @Get()
    async getAll() {
        return await this.usuarioService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.usuarioService.findById(id);
    }


    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: UsuarioDto) {
        return await this.usuarioService.create(dto);
    }
    

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UsuarioDto) {
        return await this.usuarioService.update(id, dto);
    }


    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.usuarioService.delete(id)
    }
}