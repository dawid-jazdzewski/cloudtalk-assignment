import { TransformFnParams } from 'class-transformer/types/interfaces';

export const upperCaseTransformer = (params: TransformFnParams): string | undefined =>
  params.value?.toUpperCase().trim();
