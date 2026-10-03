import { Controller, Post, Body } from '@nestjs/common';
import { SimuladorService } from './simulador.service';
import { CalcularCuotaDto } from './dto/calcular-cuota.dto';

@Controller('simulador')
export class SimuladorController {
  constructor(private readonly simuladorService: SimuladorService) {}

  @Post('calcular')
  calcular(@Body() dto: CalcularCuotaDto) {
    return this.simuladorService.calcularSimulacion(dto);
  }
}
