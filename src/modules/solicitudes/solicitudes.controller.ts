import { Controller, Post, Get, Body, Param, Req } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { Request } from 'express';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Post()
  crear(@Body() dto: CreateSolicitudDto, @Req() req: Request) {
    const clientIp =
      (req.headers['cf-connecting-ip'] as string) ||
      (req.headers['x-forwarded-for'] as string) ||
      req.ip ||
      '127.0.0.1';

    return this.solicitudesService.crearSolicitud(dto, clientIp);
  }

  @Get(':codigo/estado')
  consultar(@Param('codigo') codigo: string) {
    return this.solicitudesService.consultarEstado(codigo);
  }
}
