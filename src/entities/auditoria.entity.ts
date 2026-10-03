import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('auditoria_logs')
export class AuditoriaLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accion: string; // PRESTAMO_APROBADO, TASA_MODIFICADA, USUARIO_BLOQUEADO

  @Column('uuid')
  usuarioOperadorId: string; // ID del Admin que hizo la acción

  @Column('text')
  detalle: string; // Contexto de lo que pasó en formato JSON string o texto

  @Column()
  ipOrigen: string;

  @CreateDateColumn()
  fechaAccion: Date;
}
