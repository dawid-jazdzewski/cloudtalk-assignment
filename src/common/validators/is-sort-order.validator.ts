import { ValidationOptions, registerDecorator } from 'class-validator';

export const IsSortOrder =
  (validationOptions?: ValidationOptions) => (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsSortDirection',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} should be ASC or DESC`,
        ...validationOptions,
      },
      validator: {
        validate(value: any) {
          return value === 'ASC' || value === 'DESC';
        },
      },
    });
  };
