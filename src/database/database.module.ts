import { Module } from '@nestjs/common';

import { PostgresConnectionModule } from './connections';
import { subscribers } from './subscribers';

@Module({
  imports: [PostgresConnectionModule],
  providers: [...subscribers],
})
export class DatabaseModule {}
