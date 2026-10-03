import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { SolicitudCredito } from './solicitud-credito.entity';

@Entity('cronogramas_pago')
export class CronogramaPago {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SolicitudCredito, solicitud => solicitud.cuotas)
  solicitud: SolicitudCredito;

  @Column('int')
  numeroCuota: number;

  @Column('date')
  fechaVencimiento: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  montoCuota: number;

  @Column('decimal', { precision: 10, scale: 2 })
  capitalAbonado: number;

  @Column('decimal', { precision: 10, scale: 2 })
  interesPagado: number;

  @Column({ default: 'PENDIENTE' })
  estado: string; // PENDIENTE, PAGADO, ATRASADO

  @CreateDateColumn()
  fechaCreacion: Date;
}
