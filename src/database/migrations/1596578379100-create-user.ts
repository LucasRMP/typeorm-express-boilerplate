import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUser1596578379100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            generationStrategy: 'uuid',
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
          { type: 'date', name: 'createdAt' },
          { type: 'date', name: 'updatedAt' },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
