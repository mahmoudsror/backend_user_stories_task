import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class usersTable1631101999292 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name:"createdAt",
                    type:"timestamp"
                },
                {
                    name:"updatedAt",
                    type:"timestamp"
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");

    }

}
