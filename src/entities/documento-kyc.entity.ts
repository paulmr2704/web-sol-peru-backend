import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('documentos_kyc')
export class DocumentoKyc {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, usuario => usuario.documentosKyc)
  usuario: Usuario;

  @Column()
  tipoDocumento: string; // DNI_FRENTE, DNI_REVERSO, RECIBO_LUZ

  @Column()
  urlArchivo: string;

  @Column({ default: 'PENDIENTE' })
  estadoVerificacion: string; // PENDIENTE, VERIFICADO, RECHAZADO

  @CreateDateColumn()
  fechaSubida: Date;
}
