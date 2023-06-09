import { User } from "../models/User";
import { sequelize } from "../sequelize";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Context } from "../utils/StrategyPattern";
import { Op } from "sequelize";
import { Content } from "../models/Content";
import { UserCategory } from "../models/UserCategory";
// import { UserComment } from "../models/UserComment";
// import { UserContent } from "../models/UserContent";
import { Category } from "../models/Category";

// import { UserRole } from "../models/UserRole";
// import { UserSerializer } from "../serializers/userSerializer";

export interface IUserRepo {
  createUser(user: any): Promise<User | any>;
  updateUser(user: any): Promise<User | any>;
  exists(model: any): Promise<boolean>;
  getUser(model: any): Promise<any>;
  login(model: any): Promise<any>;
}

export class UserRepository implements IUserRepo {
  createUser = async (user: any) => {
    let txn;
    try {
      txn = await sequelize.transaction();
      let userObj = new User({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        userName: user.userName
      })
      let saved = await userObj.save({ transaction: txn })
      let categories = await Category.findAll();
      for (let i in categories) {
        let userCatObj = new UserCategory({
          score: 0,
          userId: saved.id,
          categoryId: categories[i].id
        })
        await userCatObj.save({ transaction: txn })
      }

      await txn.commit();
      return true;
    }
    catch (error) {
      if (txn) await txn.rollback();
      throw Error(error);
    }
  }
  login = async (model): Promise<any> => {
    try {


      let user = await User.findOne({
        where: {
          email: model.email
        },
      })

      if (!user) return null;

      let password = model.password;

      let verificationStatus = await bcrypt.compare(password, user.password);
      let userWithToken;
      if (verificationStatus == true)
        userWithToken = await this.generateTokens(verificationStatus, user);
      console.log(userWithToken)

      return userWithToken;

    } catch (error) {
      throw Error(error);
    }
  }
  generateTokens = async (verified: boolean, user: any): Promise<any> => {
    try {

      let secretKey = process.env.ACCESS_JWT;
      if (!secretKey) secretKey = "";
      const token = jwt.sign(
        {
          userName: user.userName,
          userId: user.id
        },
        secretKey,
        { expiresIn: "8h" }
      );

      //Send the jwt in the response
      user['token'] = token;

      return user;

    }
    catch (error) {
      throw Error(error);
    }



  }
  updateUser(user: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  exists = async (model: any): Promise<boolean> => {
    try {
      let context = new Context();
      let qstr = context.preprocess(model, ['email'], [], [], null, null, null);
      console.log(qstr)
      let user = await User.findOne(qstr);
      console.log(user)
      if (user) return true;
      else return false;
    }
    catch (error) {
      throw Error(error);
    }
  }
  getUser = async (model: any) => {
    try {
      let context = new Context();
      let users;
      if (model.searchString) {
        users = await User.findAll({
          where: {
            [Op.or]: [
              {
                email: {
                  [Op.iLike]: "%" + model.searchString + "%"
                }
              },
              {
                fullName: {
                  [Op.iLike]: "%" + model.searchString + "%"
                }
              },
              {
                userName: {
                  [Op.iLike]: "%" + model.searchString + "%"
                }
              }

            ]
          }
        })
      }
      else {
        let obj = model.user;
        console.log(obj)
        let includeObj = [
          {
            model: Content,
            required: false,
            as: 'createdContent',
            order: [['Content.createdAt', 'DESC']],
            include: [
              {
                model: User,
                as: 'user',
                required: false
              }
            ]


          },
          {
            model: Content,
            required: false,
            as: 'favvoriteContents',
            order: [['Content.createdAt', 'DESC']],
            include: [
              {
                model: User,
                as: 'user',
                required: false
              }
            ]

          },
        ]
        let qstr = context.preprocess(model, ["email", "id"], [], [], null, null, includeObj)
        console.log(qstr)
        console.log(qstr.where[Object.keys(qstr.where)[0]])
        users = await User.findAll(qstr);
      }
      return users;
    }
    catch (error) {
      console.log(error)
      throw Error(error)
    }
  }
  // deleteUser = async (model: any) => {
  //   let txn;
  //   try {
  //     txn = await sequelize.transaction();
  //     await UserCategory.destroy({
  //       where: {
  //         userId: model.user.id
  //       }, transaction: txn
  //     }

  //     )
  //     await UserComment.destroy({
  //       where: {
  //         userId: model.user.id
  //       }, transaction: txn
  //     }

  //     )

  //     await UserContent.destroy({
  //       where: {
  //         userId: model.user.id
  //       }, transaction: txn
  //     })
  //     let contents = await Content.findAll({
  //       where: {
  //         createdBy: model.user.id
  //       }
  //     })
  //     for(let i in contents){
  //       await UserContent.destroy({
  //         where: {
  //           userId: model.user.id
  //         }, transaction: txn
  //       })
  //     }

  //   }
  //   catch (error) {
  //     throw Error(error)
  //   }
  // }




}
