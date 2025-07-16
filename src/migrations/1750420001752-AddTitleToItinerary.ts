import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitleToItinerary1750420001752 implements MigrationInterface {
    name = 'AddTitleToItinerary1750420001752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "itineraries" DROP CONSTRAINT "FK_c4c99b519870c6df21578784154"`);
        await queryRunner.query(`ALTER TABLE "galleries" DROP CONSTRAINT "FK_cdb666c9cbdee25a74172ee298a"`);
        await queryRunner.query(`ALTER TABLE "itineraries" ADD "title" character varying`);
        await queryRunner.query(`ALTER TABLE "itineraries" ADD CONSTRAINT "FK_c4c99b519870c6df21578784154" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "galleries" ADD CONSTRAINT "FK_cdb666c9cbdee25a74172ee298a" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "galleries" DROP CONSTRAINT "FK_cdb666c9cbdee25a74172ee298a"`);
        await queryRunner.query(`ALTER TABLE "itineraries" DROP CONSTRAINT "FK_c4c99b519870c6df21578784154"`);
        await queryRunner.query(`ALTER TABLE "itineraries" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "galleries" ADD CONSTRAINT "FK_cdb666c9cbdee25a74172ee298a" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "itineraries" ADD CONSTRAINT "FK_c4c99b519870c6df21578784154" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
