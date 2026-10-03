import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('health')
export class HealthController {
  @Get()
  checkHealth(@Req() req: Request) {
    const clientIp = req.headers['cf-connecting-ip'] || req.ip;
    const isCloudflare = !!req.headers['cf-ray'];

    return {
      status: 'UP',
      servicio: 'Financiera Sol Perú - API Backend',
      entorno: process.env.NODE_ENV || 'development',
      fechaUTC: new Date().toISOString(),
      seguridad: {
        cloudflareDetectado: isCloudflare,
        ipCliente: clientIp,
        zeroTrust: 'Habilitado (Validación estricta DTOs)',
        defensaEnProfundidad: 'Activa (Helmet + Throttler + CORS + Whitelist)',
        iso27001Alineado: true,
      },
    };
  }
}
