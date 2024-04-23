export interface SeedServiceProvider {
  run(...args: unknown[]): Promise<any>;
}
