import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { HealthModule } from './modules/health/health.module';
import { SimuladorModule } from './modules/simulador/simulador.module';
import { SolicitudesModule } from './modules/solicitudes/solicitudes.module';
import { AuditModule } from './modules/audit/audit.module';

import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    // ISO 27001 A.8.24: Variables de Entorno Seguras
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Conexión a Base de Datos (Neon Postgres)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true, // Solo para desarrollo, sincroniza entidades a tablas
        ssl: {
          rejectUnauthorized: false, // Requerido para conexiones cloud como Neon
        },
      }),
    }),

    // Defensa en Profundidad Capa 2: Rate Limiting Anti-DDoS
    // Máximo 10 peticiones cada 60 segundos por IP
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),

    AuditModule,
    HealthModule,
    SimuladorModule,
    SolicitudesModule,
  ],
  providers: [
    // Guardián Global de Rate Limiting
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // Interceptor Global de Auditoría ISO 27001 A.8.15
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    // Filtro Global de Manejo Seguro de Excepciones ISO 27001 A.8.28
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
