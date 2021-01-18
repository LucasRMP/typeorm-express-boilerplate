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
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
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
            name: 'gh_profile',
            type: 'jsonb',
            isNullable: true,
            isArray: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: "timezone('utc'::text, now())",
          },
          {
            name: 'updated_at',
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
