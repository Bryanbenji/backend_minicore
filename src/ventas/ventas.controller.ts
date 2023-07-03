import { MessageDto } from './../common/message.dto';
import { VentasService } from './ventas.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { VentasDto } from './dto/ventas.dto';



export interface dateParams {
    beginDate: Date;
    endDate: Date;
  }


@Controller('venta')
export class VentasController {

    constructor(private readonly ventasService: VentasService) {}


    @Get()
    async getAll() {
        return await this.ventasService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.ventasService.findById(id);
    }

    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: VentasDto) {
        return await this.ventasService.create(dto);
    }
    
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: VentasDto) {
        return await this.ventasService.update(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.ventasService.delete(id)
    }


    @Post('/comisionminicore')
    async minicore(@Body() params: dateParams) {
    return await this.ventasService.getReportBetweenDates(
      params.beginDate,
      params.endDate,
    );
    }

}