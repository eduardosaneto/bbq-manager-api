import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1630818987553 implements MigrationInterface {
  name = "CreateDatabase1630818987553";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE \"participants\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"drinks\" boolean NOT NULL, \"amountToPay\" integer NOT NULL, \"payed\" boolean NOT NULL, \"barbecueId\" integer NOT NULL, \"totalParticipants\" character varying NOT NULL, \"participantId\" integer, CONSTRAINT \"PK_1cda06c31eec1c95b3365a0283f\" PRIMARY KEY (\"id\"))",
    );
    await queryRunner.query(
      "CREATE TABLE \"barbecues\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"date\" character varying NOT NULL, \"description\" character varying NOT NULL, \"observations\" character varying NOT NULL, \"amountCollected\" character varying NOT NULL, \"totalParticipants\" character varying NOT NULL, CONSTRAINT \"PK_0c58f9d6bd1d8116438178588b3\" PRIMARY KEY (\"id\"))",
    );
    await queryRunner.query(
      "CREATE TABLE \"sessions\" (\"id\" SERIAL NOT NULL, \"token\" character varying NOT NULL, \"userId\" integer NOT NULL, CONSTRAINT \"PK_3238ef96f18b355b671619111bc\" PRIMARY KEY (\"id\"))",
    );
    await queryRunner.query(
      "CREATE TABLE \"users\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"email\" character varying NOT NULL, \"password\" character varying NOT NULL, CONSTRAINT \"PK_a3ffb1c0c8416b9fc6f907b7433\" PRIMARY KEY (\"id\"))",
    );
    await queryRunner.query(
      "ALTER TABLE \"participants\" ADD CONSTRAINT \"FK_74cb5735e8f3ebd3d0382a9b870\" FOREIGN KEY (\"participantId\") REFERENCES \"barbecues\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"participants\" DROP CONSTRAINT \"FK_74cb5735e8f3ebd3d0382a9b870\"");
    await queryRunner.query("DROP TABLE \"users\"");
    await queryRunner.query("DROP TABLE \"sessions\"");
    await queryRunner.query("DROP TABLE \"barbecues\"");
    await queryRunner.query("DROP TABLE \"participants\"");
  }
}
