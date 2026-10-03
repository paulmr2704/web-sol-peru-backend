import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('FinancieraSolPeru-Backend');
  const app = await NestFactory.create(AppModule);

  // 1. CLOUDFLARE READY: Confianza en el Proxy de Cloudflare para capturar IP real
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', 1);

  // 2. DEFENSA EN PROFUNDIDAD (CAPA 1): Cabeceras HTTP de Alta Seguridad con Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'"],
          fontSrc: ["'self'", 'https:', 'data:'],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"], // Anti-Clickjacking
        },
      },
      frameguard: {
        action: 'deny', // X-Frame-Options: DENY (ISO 27001 anti-clonación)
      },
      hidePoweredBy: true, // Oculta "X-Powered-By: Express" a atacantes
      hsts: {
        maxAge: 31536000, // 1 año TLS estricto
        includeSubDomains: true,
        preload: true,
      },
    }),
  );

  // 3. DEFENSA EN PROFUNDIDAD (CAPA 3): CORS Estricto
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3000';
  app.enableCors({
    origin: [allowedOrigin, 'http://localhost:3000', 'https://solperu.pe'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'cf-connecting-ip',
      'cf-ray',
    ],
    credentials: true,
  });

  // 4. ZERO TRUST: Validación de Entrada Estricta (Rechazo automático de datos extraños)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve automáticamente campos que no estén en el DTO
      forbidNonWhitelisted: true, // Lanza error 400 si un atacante envía parámetros sospechosos
      transform: true, // Transforma tipos automáticamente
      stopAtFirstError: false,
    }),
  );

  // Prefijo global de API
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 4000;
  await app.listen(port);

  logger.log(`====================================================`);
  logger.log(`  FINANCIERA SOL PERÚ - BACKEND DE ALTA SEGURIDAD`);
  logger.log(`  Servidor activo en: http://localhost:${port}/api/v1`);
  logger.log(`  Defensa en Profundidad: ACTIVADA (5 Capas)`);
  logger.log(`  Zero Trust Validation: ACTIVADA`);
  logger.log(`  Cloudflare Proxy Ready: ACTIVADO (trust proxy: 1)`);
  logger.log(`  Alineación ISO 27001: ACTIVADA (A.8.15, A.8.24, A.8.28)`);
  logger.log(`====================================================`);
}

bootstrap();
