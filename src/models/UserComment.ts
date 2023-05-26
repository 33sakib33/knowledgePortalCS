import {
    Model,
    Table,
    Column,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";
import { Comment } from "./Comment";

@Table({ tableName: "user_comment", underscored: false })
export class UserComment extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Comment)
    @Column
    commentId!: number;

    @Column
    interactionType!: string;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Comment)
    comment!: Comment;
}
