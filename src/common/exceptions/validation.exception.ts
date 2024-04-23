import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

export class ValidationException extends UnprocessableEntityException {
  constructor(errors: unknown) {
    super({
      message: 'Validation error',
      error: 'Unprocessable Entity',
      details: errors,
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}
