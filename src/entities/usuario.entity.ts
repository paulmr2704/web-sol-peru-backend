import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { SolicitudCredito } from './solicitud-credito.entity';
import { DocumentoKyc } from './documento-kyc.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 15 })
  documentoIdentidad: string; // DNI o RUC

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column({ unique: true })
  email: string;

  @Column()
  telefono: string;

  @Column({ default: 'CLIENTE' })
  rol: string; // CLIENTE, ADMIN, ANALISTA

  @OneToMany(() => SolicitudCredito, solicitud => solicitud.usuario)
  solicitudes: SolicitudCredito[];

  @OneToMany(() => DocumentoKyc, doc => doc.usuario)
  documentosKyc: DocumentoKyc[];

  @CreateDateColumn()
  fechaRegistro: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
