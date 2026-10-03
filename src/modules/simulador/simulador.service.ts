import { Injectable } from '@nestjs/common';
import { CalcularCuotaDto } from './dto/calcular-cuota.dto';

@Injectable()
export class SimuladorService {
  // Tasa Efectiva Mensual (TEM) referencial para Sol Perú (ej. 2.8% mensual)
  private readonly TEM_REFERENCIAL = 0.028;

  calcularSimulacion(dto: CalcularCuotaDto) {
    const monto = dto.monto;
    const meses = dto.plazoMeses;
    const tem = dto.tasaEfectivaMensual || this.TEM_REFERENCIAL;

    // Fórmula de Amortización Francesa (Cuota Fija)
    // C = M * [tem * (1 + tem)^n] / [(1 + tem)^n - 1]
    const factor = Math.pow(1 + tem, meses);
    const cuotaMensual = (monto * (tem * factor)) / (factor - 1);
    const cuotaRedondeada = Math.round(cuotaMensual * 100) / 100;
    const totalPagar = Math.round(cuotaRedondeada * meses * 100) / 100;
    const totalIntereses = Math.round((totalPagar - monto) * 100) / 100;

    return {
      montoSolicitado: monto,
      plazoMeses: meses,
      tasaEfectivaMensualPorcentaje: `${(tem * 100).toFixed(2)}%`,
      cuotaMensualReferencial: cuotaRedondeada,
      totalInteresesReferencial: totalIntereses,
      totalAPagarReferencial: totalPagar,
      moneda: 'PEN (Soles)',
      notaLegal:
        'Esta simulación es referencial e informativa. Los parámetros definitivos, tasa de interés y cronograma formal se confirman durante la evaluación crediticia.',
    };
  }
}
