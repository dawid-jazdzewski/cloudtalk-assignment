import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migrations/**/*{.ts,.js}'],
  migrationsRun: process.env.DATABASE_RUN_MIGRATIONS === 'true',
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  extra: {
    max: process.env.DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
      : 100,
  },
  autoLoadEntities: true,
} as DataSourceOptions);
