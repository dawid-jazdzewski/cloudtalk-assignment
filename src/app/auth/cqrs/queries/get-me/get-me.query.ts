import { Query } from '@nestjs-architects/typed-cqrs';

import { MeEndpointResponse } from '@/app/auth/types';

export class GetMeQuery extends Query<MeEndpointResponse> {
  constructor(public readonly userId: string) {
    super();
  }
}
