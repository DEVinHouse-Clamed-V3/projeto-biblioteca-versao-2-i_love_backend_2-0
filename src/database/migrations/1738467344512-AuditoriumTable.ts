import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AuditoriumsTable1735346718792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'auditorium',
                    columns: [
                        {
                        name: 'id',
                        isPrimary: true,
                        type: 'serial'
                        },
                        {
                            name: 'name',
                            type: 'varchar',
                            length: '150',
                            isNullable: false
                        },
                        {
                            name: 'capacity',
                            type: 'int'
                        },
                        {
                            name: 'location',
                            type: 'varchar',
                            length: '150'
                        },
                        {
                            name: 'has_projector',
                            type: 'boolean',
                            default: true
                        },
                        {
                            name: 'has_sound_system',
                            type: 'boolean',
                            default: true
                        },
                        {
                            name: "createdAt",
                            type: "timestamp",
                            default: `'now()'`,
                        },
                        {
                            name: "updatedAt",
                            type: "timestamp",
                            default: `'now()'`,
                        }
                    ]
                }
            ), true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('auditorium')
    }

}
