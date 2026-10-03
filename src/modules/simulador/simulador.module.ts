import { Module } from '@nestjs/common';
import { SimuladorService } from './simulador.service';
import { SimuladorController } from './simulador.controller';

@Module({
  controllers: [SimuladorController],
  providers: [SimuladorService],
  exports: [SimuladorService],
})
export class SimuladorModule {}
