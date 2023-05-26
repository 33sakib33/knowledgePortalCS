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
    HasMany,
    // ForeignKey,
} from "sequelize-typescript";
import { Content } from "./Content";
import { User } from "./User";

// import { Role } from "./Role";

@Table({ tableName: "comments", underscored: false })
export class Comment extends Model {


    @ForeignKey(()=>Comment)
    @AllowNull(true)
    @Column
    parentCommentId!: number

    @ForeignKey(()=>Content)
    @AllowNull(true)
    @Column
    contentId!: number
    
    @BelongsTo(() => Comment,{as:"parentComment"})
    parentElement!: Comment

    @HasMany(() => Comment,{as:"replies"})
    childs!: Comment[]

    @BelongsTo(() => Content)
    content!: Content

    @AllowNull(true)
    @Column
    title!: string;


    @AllowNull(true)
    @Column
    text!: string;

    @AllowNull(true)
    @Column
    likes!:number;


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
    user!: User

    @BeforeCreate
    static rankDefautl(instance: Comment) {
      instance.likes = 0;
    }
  
}



