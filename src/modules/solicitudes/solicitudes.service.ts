import { Injectable, Logger } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { AuditService } from '../audit/audit.service';

export interface SolicitudRegistrada {
  id: string;
  codigoSeguimiento: string;
  fechaRegistroUTC: string;
  nombreCompleto: string;
  dni: string;
  telefono: string;
  email: string;
  producto: string;
  estado: 'PENDIENTE_REVISION' | 'EN_EVALUACION' | 'CONTACTADO';
  oficinaAsignada: string;
}

@Injectable()
export class SolicitudesService {
  private readonly logger = new Logger(SolicitudesService.name);
  private readonly solicitudesEnMemoria: Map<string, SolicitudRegistrada> = new Map();

  constructor(private readonly auditService: AuditService) {}

  async crearSolicitud(dto: CreateSolicitudDto, clientIp: string) {
    const anio = new Date().getFullYear();
    const correlativo = (this.solicitudesEnMemoria.size + 1).toString().padStart(4, '0');
    const codigo = `SOL-${anio}-${correlativo}`;
    const id = `REQ-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const registro: SolicitudRegistrada = {
      id,
      codigoSeguimiento: codigo,
      fechaRegistroUTC: new Date().toISOString(),
      nombreCompleto: dto.nombreCompleto.trim(),
      dni: dto.dni.trim(),
      telefono: dto.telefono.trim(),
      email: dto.email.toLowerCase().trim(),
      producto: dto.producto,
      estado: 'PENDIENTE_REVISION',
      oficinaAsignada: 'Jr. Ciro Alegría S/N (Ciudad Constitución, Pasco)',
    };

    this.solicitudesEnMemoria.set(codigo, registro);

    // Auditoría inmutable ISO 27001 A.8.15
    this.auditService.registrarEvento(
      clientIp,
      'REGISTRO_PRE_EVALUACION',
      {
        codigo,
        producto: dto.producto,
        dniEnmascarado: `****${dto.dni.slice(-4)}`,
      },
      'EXITO',
    );

    this.logger.log(`[SOLICITUD NUEVA] Código: ${codigo} | DNI: ****${dto.dni.slice(-4)} | Producto: ${dto.producto}`);

    return {
      exito: true,
      mensaje: 'Solicitud de pre-evaluación registrada exitosamente.',
      codigoSeguimiento: codigo,
      oficina: 'Oficina Central Ciudad Constitución',
      direccion: 'Jr. Ciro Alegría S/N, frente a Financiera Confianza',
      proximoPaso: 'Un asesor de Financiera Sol Perú se comunicará contigo al teléfono provisto en las próximas 24 horas.',
      fechaUTC: registro.fechaRegistroUTC,
    };
  }

  async consultarEstado(codigo: string) {
    const solicitud = this.solicitudesEnMemoria.get(codigo);
    if (!solicitud) {
      return {
        encontrado: false,
        mensaje: 'No se encontró ninguna solicitud con el código provisto.',
      };
    }

    return {
      encontrado: true,
      codigo: solicitud.codigoSeguimiento,
      estado: solicitud.estado,
      producto: solicitud.producto,
      fecha: solicitud.fechaRegistroUTC,
      oficina: solicitud.oficinaAsignada,
    };
  }
}
