import {
    Model,
    Column,
    Table,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    AllowNull,
    // ForeignKey,
} from "sequelize-typescript";


// import { Role } from "./Role";

@Table({ tableName: "category", underscored: false })
export class Category extends Model {


    @AllowNull(true)
    @Column
    type!: string;

    @AllowNull(true)
    @Column
    topic!: number;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @DeletedAt
    @Column
    deletedAt!: Date;


}



