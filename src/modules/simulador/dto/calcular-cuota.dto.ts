import { IsNumber, Min, Max, IsOptional } from 'class-validator';

export class CalcularCuotaDto {
  @IsNumber({}, { message: 'El monto debe ser un valor numérico' })
  @Min(500, { message: 'El monto mínimo a simular es S/ 500' })
  @Max(50000, { message: 'El monto máximo a simular es S/ 50,000' })
  monto!: number;

  @IsNumber({}, { message: 'El plazo en meses debe ser un valor numérico' })
  @Min(3, { message: 'El plazo mínimo es de 3 meses' })
  @Max(36, { message: 'El plazo máximo es de 36 meses' })
  plazoMeses!: number;

  @IsOptional()
  @IsNumber()
  tasaEfectivaMensual?: number;
}
