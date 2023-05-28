import {
    Model,
    Column,
    Table,
    ForeignKey,
    BelongsTo,
    AllowNull,

} from "sequelize-typescript";
import { User } from "./User";
import { Category } from "./Category";

@Table({ tableName: "user_category", underscored: false })
export class UserCategory extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Category)
    @Column
    categoryId!: number;


    @AllowNull(true)
    @Column
    score!: number;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Category)
    category!: Category;
}
