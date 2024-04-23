import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
import { HttpStatus } from '@nestjs/common';

const getTypeORMExceptionStatus = (exception: TypeORMError): number => {
  if (exception instanceof EntityNotFoundError) {
    return HttpStatus.NOT_FOUND;
  }

  if (exception instanceof QueryFailedError) {
    return HttpStatus.UNPROCESSABLE_ENTITY;
  }

  return HttpStatus.INTERNAL_SERVER_ERROR;
};

@Catch(TypeORMError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const message = exception.message;
    const error = exception.name;
    const status = getTypeORMExceptionStatus(exception);

    response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }
}
