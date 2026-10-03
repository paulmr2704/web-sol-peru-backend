import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { SolicitudCredito } from './solicitud-credito.entity';

@Entity('evaluaciones_riesgo')
export class EvaluacionRiesgo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => SolicitudCredito, solicitud => solicitud.evaluacionRiesgo)
  @JoinColumn()
  solicitud: SolicitudCredito;

  @Column('int')
  scoreCrediticio: number;

  @Column()
  nivelRiesgo: string; // BAJO, MEDIO, ALTO

  @Column('text', { nullable: true })
  observacionesAutomaticas: string;

  @Column('boolean', { default: false })
  aprobadoPorSistema: boolean;

  @CreateDateColumn()
  fechaEvaluacion: Date;
}
