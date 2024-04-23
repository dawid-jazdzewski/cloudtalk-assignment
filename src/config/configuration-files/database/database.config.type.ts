export interface DatabaseConfig {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  password?: string;
  name?: string;
  logging?: boolean;
  username?: string;
  synchronize?: boolean;
  maxConnections: number;
  sslEnabled?: boolean;
  rejectUnauthorized?: boolean;
  runMigrations?: boolean;
  runSeed?: boolean;
  seedUsername: string;
  seedPassword: string;
}
