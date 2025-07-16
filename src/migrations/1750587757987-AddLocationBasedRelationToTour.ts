import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLocationBasedRelationToTour1750587757987 implements MigrationInterface {
    name = 'AddLocationBasedRelationToTour1750587757987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tours" RENAME COLUMN "location" TO "locationId"`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "imageUrl" character varying, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "locationId"`);
        await queryRunner.query(`ALTER TABLE "tours" ADD "locationId" integer`);
        await queryRunner.query(`ALTER TABLE "tours" ADD CONSTRAINT "FK_ebebffc920bef556e0e0d1823a6" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tours" DROP CONSTRAINT "FK_ebebffc920bef556e0e0d1823a6"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "locationId"`);
        await queryRunner.query(`ALTER TABLE "tours" ADD "locationId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`ALTER TABLE "tours" RENAME COLUMN "locationId" TO "location"`);
    }

}
