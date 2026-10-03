import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('transacciones')
export class Transaccion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  solicitudId: string; // Se guarda la referencia plana para historial

  @Column()
  tipoOperacion: string; // DESEMBOLSO, PAGO_CUOTA, PAGO_MORA

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  metodoPago: string; // TRANSFERENCIA_BANCARIA, YAPE, PLIN, EFECTIVO

  @Column({ unique: true })
  codigoReferenciaOperacion: string; // ID de transacción de la pasarela o banco

  @CreateDateColumn()
  fechaTransaccion: Date;
}
