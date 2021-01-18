import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUser1596578379100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          { type: 'varchar', length: '50', name: 'mail' },
          { type: 'varchar', name: 'password' },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            default: "timezone('utc'::text, now())",
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            default: "timezone('utc'::text, now())",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
