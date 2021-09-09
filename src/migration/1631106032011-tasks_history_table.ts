import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class tasksHistoryTable1631106032011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tasks_history",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
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

        await queryRunner.addColumn("tasks_history", new TableColumn({
            name: "taskId",
            type: "int"
        }));

        await queryRunner.createForeignKey("tasks_history", new TableForeignKey({
            columnNames: ["taskId"],
            referencedColumnNames: ["id"],
            referencedTableName: "tasks",
            onDelete: "CASCADE"
        }));

        await queryRunner.addColumn("tasks_history", new TableColumn({
            name: "userId",
            type: "int"
        }));

        await queryRunner.createForeignKey("tasks_history", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tasks_history");
        if(table){
            const userIdForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
            if(userIdForeignKey)
                await queryRunner.dropForeignKey("tasks_history", userIdForeignKey);
            const taskIdForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("taskId") !== -1);
                if(taskIdForeignKey)
                    await queryRunner.dropForeignKey("tasks_history", taskIdForeignKey);
        }
        await queryRunner.dropColumn("tasks_history", "userId");
        await queryRunner.dropColumn("tasks_history", "taskId");
        await queryRunner.dropTable("tasks_history");
    }

}
