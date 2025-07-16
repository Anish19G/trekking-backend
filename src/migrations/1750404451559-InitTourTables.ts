import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTourTables1750404451559 implements MigrationInterface {
    name = 'InitTourTables1750404451559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "itineraries" ("id" SERIAL NOT NULL, "day" character varying NOT NULL, "description" text NOT NULL, "tourId" integer, CONSTRAINT "PK_9c5db87d0f85f56e4466ae09a38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "galleries" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "tourId" integer, CONSTRAINT "PK_86b77299615c92db3d68c9c7919" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tours" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "overview" text NOT NULL, "tourInfo" text NOT NULL, "highlights" text NOT NULL, "category" character varying NOT NULL, "location" character varying NOT NULL, "duration" character varying NOT NULL, "price" numeric NOT NULL, "rating" numeric NOT NULL, "inclusion" text NOT NULL, "exclusion" text NOT NULL, "mapEmbedUrl" character varying NOT NULL, CONSTRAINT "PK_2202ba445792c1ad0edf2de8de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "itineraries" ADD CONSTRAINT "FK_c4c99b519870c6df21578784154" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "galleries" ADD CONSTRAINT "FK_cdb666c9cbdee25a74172ee298a" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "galleries" DROP CONSTRAINT "FK_cdb666c9cbdee25a74172ee298a"`);
        await queryRunner.query(`ALTER TABLE "itineraries" DROP CONSTRAINT "FK_c4c99b519870c6df21578784154"`);
        await queryRunner.query(`DROP TABLE "tours"`);
        await queryRunner.query(`DROP TABLE "galleries"`);
        await queryRunner.query(`DROP TABLE "itineraries"`);
    }

}
