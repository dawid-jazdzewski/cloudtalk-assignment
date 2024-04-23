import { HttpStatus, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { ValidationException } from '@/common/exceptions';

const parseValidationErrors = (errors: ValidationError[]) => {
  return errors.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.property]:
        (currentValue.children?.length || 0) > 0
          ? parseValidationErrors(currentValue.children || [])
          : Object.values(currentValue.constraints || {}).join(', '),
    }),
    {},
  );
};

export const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  validateCustomDecorators: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) => {
    return new ValidationException(parseValidationErrors(errors));
  },
};
