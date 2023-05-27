import {
    Model,
    Column,
    Table,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    AllowNull,
    ForeignKey,
    BelongsTo,
    BeforeCreate,
    BelongsToMany,
    // ForeignKey,
} from "sequelize-typescript";
import { User } from "./User";
import { UserContent } from "./UserContent";

// import { Role } from "./Role";

@Table({ tableName: "content", underscored: false })
export class Content extends Model {


    @AllowNull(true)
    @Column
    title!: string;

    @AllowNull(true)
    @Column
    type!: string;

    @AllowNull(true)
    @Column
    topic!: string;

    @AllowNull(true)
    @Column
    contentText!: string;

    @AllowNull(true)
    @Column
    likes!: number;

    @AllowNull(true)
    @Column
    shares!: number;


    @AllowNull(true)
    @Column
    approve!: boolean


    @CreatedAt
    @Column
    createdAt!: Date;


    @UpdatedAt
    @Column
    updatedAt!: Date;

    @DeletedAt
    @Column
    deletedAt!: Date;

    @ForeignKey(() => User)
    @AllowNull
    @Column
    createdBy!: number;

    @BelongsTo(() => User)
    user?: User

    @BelongsToMany(() => User, () => UserContent)
    interactedUser?: User[];


    @BeforeCreate
    static rankDefautl(instance: Content) {
        instance.approve = false;
        instance.likes = 0;
        instance.shares = 0;
    }


}



