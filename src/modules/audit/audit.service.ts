import { Injectable } from '@nestjs/common';

export interface AuditEntry {
  id: string;
  timestamp: string;
  ip: string;
  accion: string;
  detalles: Record<string, any>;
  estado: 'EXITO' | 'FALLO' | 'BLOQUEADO';
}

@Injectable()
export class AuditService {
  private readonly logs: AuditEntry[] = [];

  registrarEvento(
    ip: string,
    accion: string,
    detalles: Record<string, any>,
    estado: 'EXITO' | 'FALLO' | 'BLOQUEADO' = 'EXITO',
  ) {
    const entry: AuditEntry = {
      id: `AUD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      ip,
      accion,
      detalles,
      estado,
    };

    this.logs.push(entry);
    // En producción se persiste en tabla audit_logs de Supabase/PostgreSQL
    return entry;
  }

  obtenerUltimosLogs(limite: number = 20): AuditEntry[] {
    return this.logs.slice(-limite);
  }
}
