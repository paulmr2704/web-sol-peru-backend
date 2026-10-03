import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { EvaluacionRiesgo } from './evaluacion-riesgo.entity';
import { CronogramaPago } from './cronograma-pago.entity';

@Entity('solicitudes_credito')
export class SolicitudCredito {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, usuario => usuario.solicitudes)
  usuario: Usuario;

  @Column('decimal', { precision: 10, scale: 2 })
  montoSolicitado: number;

  @Column('int')
  plazoMeses: number;

  @Column('decimal', { precision: 5, scale: 2 })
  tasaInteresAnual: number; // TEA

  @Column({ default: 'EVALUACION' })
  estado: string; // EVALUACION, APROBADO, RECHAZADO, DESEMBOLSADO, PAGADO

  @OneToOne(() => EvaluacionRiesgo, evaluacion => evaluacion.solicitud)
  evaluacionRiesgo: EvaluacionRiesgo;

  @OneToMany(() => CronogramaPago, cuota => cuota.solicitud)
  cuotas: CronogramaPago[];

  @CreateDateColumn()
  fechaSolicitud: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
