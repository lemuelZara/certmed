import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAppointments1604501491460 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'doctor_id',
            type: 'integer',
          },
          {
            name: 'patient_id',
            type: 'integer',
          },
          {
            name: 'document_id',
            type: 'integer',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_appointments_doctors',
            columnNames: ['doctor_id'],
            referencedTableName: 'doctors',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_appointments_patients',
            columnNames: ['patient_id'],
            referencedTableName: 'patients',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'fk_appointments_documents',
            columnNames: ['document_id'],
            referencedTableName: 'documents',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
