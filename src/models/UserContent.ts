import {
    Model,
    Column,
    Table,
    ForeignKey,
    BelongsTo,
    
  } from "sequelize-typescript";
  import { User } from "./User";
  import { Content } from "./Content";
  
  @Table({ tableName: "user_content", underscored: false })
  export class UserContent extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: number;
  
    @ForeignKey(() => Content)
    @Column
    contentId!: number;
  
    @Column
    interactionType!: string;
  
    @BelongsTo(() => User)
    user!: User;
  
    @BelongsTo(() => Content)
    content!: Content;
  }
  