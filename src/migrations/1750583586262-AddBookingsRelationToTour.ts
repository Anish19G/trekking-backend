import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBookingsRelationToTour1750583586262 implements MigrationInterface {
    name = 'AddBookingsRelationToTour1750583586262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "checkIn" TIMESTAMP NOT NULL, "checkOut" TIMESTAMP NOT NULL, "basePrice" numeric NOT NULL, "discount" numeric NOT NULL DEFAULT '0', "tax" numeric NOT NULL DEFAULT '0', "payableNow" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "tourId" integer, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_1dcbd171601b61419854320c1b1" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_1dcbd171601b61419854320c1b1"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
    }

}
