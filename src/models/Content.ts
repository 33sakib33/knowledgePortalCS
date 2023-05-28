import { DataTypes } from "sequelize";
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
import { Category } from "./Category";
import { User } from "./User";
import { UserContent } from "./UserContent";
import { UserFavorites } from "./UserFavorites";

// import { Role } from "./Role";

@Table({ tableName: "content", underscored: false })
export class Content extends Model {


    @AllowNull(true)
    @Column
    title!: string;

    @AllowNull(true)
    @Column
    ratingCount!: number;

    @AllowNull(true)
    @Column
    type!: string;

    @AllowNull(true)
    @Column
    topic!: string;

    @AllowNull(true)
    @Column(DataTypes.TEXT)
    contentText!: any;

    @AllowNull(true)
    @Column
    rating!: number;

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

    @ForeignKey(() => Category)
    @AllowNull
    @Column
    categoryId!: number;

    @BelongsTo(() => Category)
    category?: Category

    @BelongsTo(() => User)
    user?: User

    @BelongsToMany(() => User, () => UserContent)
    interactedUser?: User[];

    @BelongsToMany(() => User, () => UserFavorites)
    favoredUsers?: User[];


    @BeforeCreate
    static rankDefautl(instance: Content) {
        instance.approve = false;
        instance.rating = 0;
        instance.shares = 0;
        instance.ratingCount = 0;
    }


}



