import {
    Model,
    Column,
    Table,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    AllowNull,
    BelongsToMany,
    // ForeignKey,
} from "sequelize-typescript";
import { User } from "./User";
import { UserCategory } from "./UserCategory";


// import { Role } from "./Role";

@Table({ tableName: "category", underscored: false })
export class Category extends Model {


    @AllowNull(true)
    @Column
    type!: string;

    @AllowNull(true)
    @Column
    topic!: String;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @DeletedAt
    @Column
    deletedAt!: Date;

    @BelongsToMany(() => User, () => UserCategory)
    userScore?: User[];



}



