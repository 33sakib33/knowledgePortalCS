import { sequelize } from "../sequelize";
import { Context } from "../utils/StrategyPattern";
import { Content } from "../models/Content";
import { QueryTypes } from "sequelize";
import { UserContent } from "../models/UserContent";
import { User } from "../models/User";
import { UserFavorites } from "../models/UserFavorites";
import { UserComment } from "../models/UserComment";
import { Comment } from "../models/Comment";
import { Category } from "../models/Category";

// import { UserRole } from "../models/UserRole";
// import { UserSerializer } from "../serializers/userSerializer";

export interface IContentRepo {
    createContent(content: any): Promise<Content | any>;
    updateContent(content: any): Promise<Content | any>;
    exists(model: any): Promise<boolean>;
    getContent(model: any): Promise<any>;
    deleteContent(model: any): Promise<any>
    interact(model: any): Promise<any>
    getRecommendations(model: any): Promise<any>
    addFav(model: any): Promise<any>;
    deleteFav(model: any): Promise<any>
    isFav(model: any): Promise<any>
}

export class ContentRepository implements IContentRepo {

    createContent = async (model: any) => {
        let txn;
        try {
            let content = model.content
            txn = await sequelize.transaction();
            let contentObj = new Content({
                title: content.title,
                contentText: content.contentText,
                topic: content.topic,
                type: content.type,
                createdBy: model.userId
            })
            await contentObj.save({ transaction: txn })

            await txn.commit();
            return true;
        }
        catch (error) {
            if (txn) await txn.rollback();
            throw Error(error);
        }
    }
    updateContent = async (model: any) => {
        let txn;
        try {

            let content = model.content;
            txn = await sequelize.transaction();
            // let oldContent = await Content.findOne({
            //     where: {
            //         id: content.id
            //     }
            // })
            let interaction = new UserContent({
                userId: model.userId,
                contentId: content.id,
                interactionType: "rating",
                rating: content.rating
            })
            await interaction.save({ transaction: txn })
            await Content.update(
                {
                    title: content.title,
                    contentText: content.contentText,
                    topic: content.topic,
                    type: content.type,
                    rating: content.rating,
                    shares: content.shares,
                    approve: content.approve
                },
                {
                    where: {
                        id: content.id
                    }
                },


            )
            await txn.commit();
            return true;
        }
        catch (error) {
            if (txn) await txn.rollback();
            console.log(error)
            throw Error(error);
        }
    }
    getContent = async (model: any) => {
        try {
            let context = new Context();
            let content;
            // let qstr;
            if (model.searchString) {
                let counter = 0;
                let queryString = `select * from core."content" where `;
                let queryStringCount = `select count(*) from core."content" where `;
                for (let i in model.content) {
                    if (model.content[i]) {
                        if (counter >= 1) {
                            queryString += "  And";
                            queryStringCount += "  And";
                        }
                        counter++;
                        queryString += i + " = " + "\'" + model.content[i] + "\'" + " ";
                        queryStringCount += i + " = " + "\'" + model.content[i] + "\'" + " ";
                    }
                }
                if (counter >= 1) queryString += "  And";
                if (counter >= 1) queryStringCount += "  And";
                queryString += " title ilike " + "\'%" + model.searchString + "%\'";
                queryStringCount += " title ilike " + "\'%" + model.searchString + "%\'";
                queryString += ";"
                queryStringCount += ";"

                console.log(queryString)
                let result = await sequelize.query(queryString, {

                    type: QueryTypes.SELECT
                })
                content = result;
                let result1 = await sequelize.query(queryStringCount, {

                    type: QueryTypes.SELECT
                })
                content = {
                    count: result1[0]["count"],
                    rows: result
                }
            }
            else {

                let obj = model
                let includeobj = [
                    {
                        model: User,
                        as: 'user',
                        required: false,
                        attributes: ['userName', 'fullName', 'rank', 'id']

                    },
                    {
                        model: Category,
                        as: 'category',
                        required: false,


                    }
                ]
                let qstr = context.preprocess(obj, ["id", "createdBy", "type", "topic"], [], ["createdAt", "DESC"], true, null, includeobj)

                console.log(qstr.where[Object.keys(qstr.where)[0]])
                content = await Content.findAndCountAll(qstr);
            }
            for (let i = 0; i < content.length; i++) {
                if (!content[i].user.fullName) content[i].user.fullName = "No Name"
                if (!content[i].user.rank) content[i].user.rank = "Unranked"
            }
            return content;
        }
        catch (error) {
            console.log(error)
            throw Error(error)
        }
    }
    exists = async (model: any): Promise<boolean> => {
        try {
            let context = new Context();
            let qstr = context.preprocess(model, ['email'], [], [], null, null, null);
            console.log(qstr)
            let user = await Content.findOne(qstr);
            console.log(user)
            if (user) return true;
            else return false;
        }
        catch (error) {
            throw Error(error);
        }
    }
    deleteContent = async (model: any) => {
        let txn;
        try {
            console.log(model)
            txn = await sequelize.transaction();
            await UserContent.destroy({
                where: {
                    contentId: model.id
                },
                transaction: txn
            })
            await UserFavorites.destroy({
                where: {
                    contentId: model.id
                },
                transaction: txn
            })
            let comments = await Comment.findAll({
                where: {
                    contentId: model.id
                }
            })
            for (let i = 0; i < comments.length; i++) {
                await UserComment.destroy({
                    where: {
                        commentId: comments[i].id
                    },
                    transaction: txn
                })
                await Comment.destroy({
                    where: {
                        id: comments[i].id
                    },
                    transaction: txn
                })
            }
            await Content.destroy({
                where: {
                    id: model.id
                },
                transaction: txn
            })
            await Content.destroy({
                where: {
                    id: model.id
                },
                transaction: txn
            })
            await txn.commit();
            return true;
        }
        catch (error) {
            if (txn) await txn.rollback();
            throw Error(error);
        }
    }


    interact = async (model: any): Promise<any> => {
        try {

        }
        catch (error) {
            throw Error(error);
        }

    }
    getRecommendations = async (model: any) => {
        try {

        }
        catch (error) {
            throw Error(error);
        }
    }
    addFav = async (model: any) => {
        let txn;
        try {
            console.log("here")
            txn = await sequelize.transaction();
            let userFav = new UserFavorites({
                userId: model.userId,
                contentId: model.contentId
            })
            console.log(userFav)
            await userFav.save({ transaction: txn })
            await txn.commit();

        }
        catch (error) {
            if (!txn) await txn.rollback();
            console.log(error);
            throw Error(error)
        }
    }
    deleteFav = async (model: any) => {
        let txn;
        try {
            console.log(model)
            console.log("-----------------------------------------------------------------")
            txn = await sequelize.transaction();
            await UserFavorites.destroy({
                where: {
                    userId: model.userId,
                    contentId: model.content.id
                },
                transaction: txn
            })
            await txn.commit();

        }
        catch (error) {
            if (!txn) await txn.rollback();
            console.log(error);
            throw Error(error)
        }
    }
    isFav = async (model: any) => {
        try {
            let obj = await UserFavorites.findOne({
                where: {
                    userId: model.userId,
                    contentId: model.content.id
                }
            })
            if (obj) return true;
            else return false;
        }
        catch (error) {
            console.log(error)
            throw Error(error)
        }
    }


}
