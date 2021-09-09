import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class tasksTable1631102004747 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tasks",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "description",
                    type: "longtext",
                },
                {
                    name: "status",
                    type: "varchar"
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
        await queryRunner.addColumn("tasks", new TableColumn({
            name: "createdBy",
            type: "int"
        }));

        await queryRunner.createForeignKey("tasks", new TableForeignKey({
            columnNames: ["createdBy"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("tasks", new TableColumn({
            name: "assignee",
            type: "int"
        }));

        await queryRunner.createForeignKey("tasks", new TableForeignKey({
            columnNames: ["assignee"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tasks");
        if(table){
            const createdByForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("createdBy") !== -1);
            if(createdByForeignKey)
                await queryRunner.dropForeignKey("tasks", createdByForeignKey);
            const assigneeForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("assignee") !== -1);
                if(assigneeForeignKey)
                    await queryRunner.dropForeignKey("tasks", assigneeForeignKey);
        }
        await queryRunner.dropColumn("tasks", "createdBy");
        await queryRunner.dropColumn("tasks", "assignee");
        await queryRunner.dropTable("tasks");
    }

}
