import { MigrationInterface, QueryRunner } from 'typeorm'

export class MANUALxAddDefaultAuthor1711026441529
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into "author" ("id", "name", "birthday", "email") values (1, 'Tom', '1970-01-01', 'hello@example.com')`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
