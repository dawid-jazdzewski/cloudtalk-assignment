import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1713899356365 implements MigrationInterface {
  name = 'InitialMigration1713899356365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."TaskEntityStatus" AS ENUM('backlog', 'in_progress', 'completed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "description" text NOT NULL, "status" "public"."TaskEntityStatus" NOT NULL DEFAULT 'backlog', "ownerId" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_607de52438268ab19a406349427" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_607de52438268ab19a406349427"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TYPE "public"."TaskEntityStatus"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_fe0bb3f6520ee0469504521e71"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
