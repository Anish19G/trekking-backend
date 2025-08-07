import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTourDetail1754548028947 implements MigrationInterface {
    name = 'AddTourDetail1754548028947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "galleries" DROP CONSTRAINT "FK_cdb666c9cbdee25a74172ee298a"`);
        await queryRunner.query(`ALTER TABLE "itineraries" DROP CONSTRAINT "FK_c4c99b519870c6df21578784154"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP CONSTRAINT "FK_ebebffc920bef556e0e0d1823a6"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_1dcbd171601b61419854320c1b1"`);
        await queryRunner.query(`ALTER TABLE "galleries" RENAME COLUMN "tourId" TO "tourDetailId"`);
        await queryRunner.query(`CREATE TABLE "tour_info" ("id" SERIAL NOT NULL, "duration" character varying NOT NULL, "placeCovered" character varying NOT NULL, "startpoint" character varying NOT NULL, "endPoint" character varying NOT NULL, CONSTRAINT "PK_ff71c40923d4420bed9d132fd99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."inclusion_exclusion_type_enum" AS ENUM('inclusion', 'exclusion')`);
        await queryRunner.query(`CREATE TABLE "inclusion_exclusion" ("id" SERIAL NOT NULL, "type" "public"."inclusion_exclusion_type_enum" NOT NULL, "item" character varying NOT NULL, "tourDetailId" integer NOT NULL, CONSTRAINT "PK_28c637d703f5e5bda3046090ad7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tour_details" ("id" SERIAL NOT NULL, "highlights" text NOT NULL, "mapEmbedUrl" text, "tourId" integer, "tourDetailId" integer, "itineraryId" integer, CONSTRAINT "REL_30994aed327aea1b5f0c2106a2" UNIQUE ("tourId"), CONSTRAINT "REL_bb96991ac15d0d00134bb57025" UNIQUE ("tourDetailId"), CONSTRAINT "REL_c7e3e03cc50e6a76f87536d5ff" UNIQUE ("itineraryId"), CONSTRAINT "PK_4fbc4688163d419042c12d76c7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "itineraries" DROP COLUMN "tourId"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "overview"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "tourInfo"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "highlights"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "inclusion"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "exclusion"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "mapEmbedUrl"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "tourId"`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "link" character varying`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "shortDes" text`);
        await queryRunner.query(`ALTER TABLE "locations" ADD "toursSummary" character varying`);
        await queryRunner.query(`ALTER TABLE "tours" ADD "review" text NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "tours" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "galleries" ADD CONSTRAINT "FK_9b9bd0119c794ddc2310b4bc730" FOREIGN KEY ("tourDetailId") REFERENCES "tour_details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inclusion_exclusion" ADD CONSTRAINT "FK_09427e66274784acdc132206354" FOREIGN KEY ("tourDetailId") REFERENCES "tour_details"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tour_details" ADD CONSTRAINT "FK_30994aed327aea1b5f0c2106a2b" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tour_details" ADD CONSTRAINT "FK_bb96991ac15d0d00134bb57025b" FOREIGN KEY ("tourDetailId") REFERENCES "tour_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tour_details" ADD CONSTRAINT "FK_c7e3e03cc50e6a76f87536d5ffc" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tours" ADD CONSTRAINT "FK_bd49341ba4d2245d564d37ac784" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tours" ADD CONSTRAINT "FK_ebebffc920bef556e0e0d1823a6" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tours" DROP CONSTRAINT "FK_ebebffc920bef556e0e0d1823a6"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP CONSTRAINT "FK_bd49341ba4d2245d564d37ac784"`);
        await queryRunner.query(`ALTER TABLE "tour_details" DROP CONSTRAINT "FK_c7e3e03cc50e6a76f87536d5ffc"`);
        await queryRunner.query(`ALTER TABLE "tour_details" DROP CONSTRAINT "FK_bb96991ac15d0d00134bb57025b"`);
        await queryRunner.query(`ALTER TABLE "tour_details" DROP CONSTRAINT "FK_30994aed327aea1b5f0c2106a2b"`);
        await queryRunner.query(`ALTER TABLE "inclusion_exclusion" DROP CONSTRAINT "FK_09427e66274784acdc132206354"`);
        await queryRunner.query(`ALTER TABLE "galleries" DROP CONSTRAINT "FK_9b9bd0119c794ddc2310b4bc730"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "tours" DROP COLUMN "review"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "toursSummary"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "shortDes"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "link"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "tourId" integer`);
        await queryRunner.query(`ALTER TABLE "tours" ADD "mapEmbedUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tours" ADD "exclusion" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tours" ADD "inclusion" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tours" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tours" ADD "highlights" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tours" ADD "tourInfo" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tours" ADD "overview" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "itineraries" ADD "tourId" integer`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "tour_details"`);
        await queryRunner.query(`DROP TABLE "inclusion_exclusion"`);
        await queryRunner.query(`DROP TYPE "public"."inclusion_exclusion_type_enum"`);
        await queryRunner.query(`DROP TABLE "tour_info"`);
        await queryRunner.query(`ALTER TABLE "galleries" RENAME COLUMN "tourDetailId" TO "tourId"`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_1dcbd171601b61419854320c1b1" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tours" ADD CONSTRAINT "FK_ebebffc920bef556e0e0d1823a6" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "itineraries" ADD CONSTRAINT "FK_c4c99b519870c6df21578784154" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "galleries" ADD CONSTRAINT "FK_cdb666c9cbdee25a74172ee298a" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
