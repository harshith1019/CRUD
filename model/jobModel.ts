import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "job",
  timestamps: false,
})
export class Job extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT.UNSIGNED,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  job_title?: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: true,
  })
  company?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  location?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  salary?: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Default(DataType.NOW) // DEFAULT CURRENT_TIMESTAMP
  @Column({
    type: DataType.DATE,
  })
  date_posted!: Date;
}
