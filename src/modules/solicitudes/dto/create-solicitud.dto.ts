import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsIn,
  Equals,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateSolicitudDto {
  @IsString({ message: 'El nombre debe ser un texto válido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(100, { message: 'El nombre no puede superar los 100 caracteres' })
  nombreCompleto!: string;

  // Zero Trust: Validación matemática y de formato exacto de DNI peruano (8 dígitos)
  @Matches(/^[0-9]{8}$/, {
    message: 'El DNI debe contener exactamente 8 dígitos numéricos válidos en el Perú',
  })
  dni!: string;

  // Celular peruano estándar (9 dígitos empezando con 9)
  @Matches(/^9[0-9]{8}$/, {
    message: 'El teléfono celular debe tener 9 dígitos e iniciar con el número 9',
  })
  telefono!: string;

  @IsEmail({}, { message: 'El correo electrónico proporcionado no tiene un formato válido' })
  email!: string;

  @IsIn(
    [
      'Crédito Emprende Ya',
      'Crédito MYPE',
      'Crédito Agrícola',
      'Crédito Personal',
      'Ahorro Futuro',
      'Protección 365',
      'Otro',
    ],
    { message: 'El producto financiero seleccionado no es válido' },
  )
  producto!: string;

  // Consentimiento legal explícito (Ley de Protección de Datos Personales N° 29733)
  @Equals(true, {
    message: 'Debe aceptar la autorización del tratamiento de datos personales para procesar la solicitud',
  })
  autorizoTratamientoDatos!: boolean;

  @IsOptional()
  @IsNumber()
  montoEstimado?: number;

  @IsOptional()
  @IsNumber()
  plazoEstimado?: number;
}
