import {
    Model,
    Column,
    Table,
    ForeignKey,
    BelongsTo,

} from "sequelize-typescript";
import { User } from "./User";
import { Content } from "./Content";

@Table({ tableName: "user_favorites", underscored: false })
export class UserFavorites extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Content)
    @Column
    contentId!: number;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Content)
    content!: Content;
}
