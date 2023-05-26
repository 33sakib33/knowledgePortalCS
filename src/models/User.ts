import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  AllowNull,
  BeforeCreate,
  HasMany,
  BelongsToMany,
  // ForeignKey,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";
import { Content } from "./Content";
import { UserContent } from "./UserContent";

// import { Role } from "./Role";

@Table({ tableName: "user", underscored: false })
export class User extends Model {


  @AllowNull(true)
  @Column
  userName!: string;

  @AllowNull(true)
  @Column
  email!: string;

  @AllowNull(true)
  @Column
  password!: string;

  @AllowNull(true)
  @Column
  fullName!: string;


  @AllowNull(true)
  @Column
  gender!: string;

  @AllowNull(true)
  @Column
  rank!: string

  @HasMany(()=>Content)
  createdContent!:Content[];

  @CreatedAt
  @Column
  createdAt!: Date;


  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt!: Date;

  @BelongsToMany(() => Content, () => UserContent)
  interactedContent?: Content[];




  @BeforeCreate
  static hashPassword(instance: User) {
    if (instance.password) {
      var hash = bcrypt.hashSync(instance.password, 8);
      instance.password = hash;
    }
  }


  @BeforeCreate
  static rankDefautl(instance: User) {
    instance.rank = "unranked";
  }

}



