import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    // ISO 27001 A.8.28: Enmascarar detalles internos de base de datos o stacktraces
    let clientMessage = 'Ocurrió un error inesperado al procesar la solicitud.';
    let validationErrors: any = null;

    if (status === HttpStatus.BAD_REQUEST) {
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resp = exceptionResponse as any;
        clientMessage = 'Error de validación en los datos enviados.';
        validationErrors = resp.message || resp.error;
      }
    } else if (status === HttpStatus.TOO_MANY_REQUESTS) {
      clientMessage = 'Ha superado el límite de solicitudes permitidas. Por favor intente más tarde.';
    } else if (exception instanceof HttpException) {
      clientMessage = exception.message;
    }

    // Registro seguro de auditoría en consola de servidor
    const clientIp = request.headers['cf-connecting-ip'] || request.ip;
    this.logger.error(
      `[HTTP ${status}] ${request.method} ${request.url} - IP: ${clientIp} - Error: ${
        exception instanceof Error ? exception.message : 'Unknown'
      }`,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      mensaje: clientMessage,
      errores: validationErrors,
    });
  }
}
