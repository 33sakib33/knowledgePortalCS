import { sequelize } from "../sequelize";
import { Context } from "../utils/StrategyPattern";
import { Content } from "../models/Content";
import { QueryTypes } from "sequelize";
import { UserContent } from "../models/UserContent";
import { User } from "../models/User";

// import { UserRole } from "../models/UserRole";
// import { UserSerializer } from "../serializers/userSerializer";

export interface IContentRepo {
    createContent(content: any): Promise<Content | any>;
    updateContent(content: any): Promise<Content | any>;
    exists(model: any): Promise<boolean>;
    getContent(model: any): Promise<any>;
    deleteContent(model: any): Promise<any>
    interact(model: any): Promise<any>
    getRecommendations(model: any): Promise<any>;
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
            let oldContent = await Content.findOne({
                where: {
                    id: content.id
                }
            })
            console.log("hello")
            if (oldContent) {
                let interaction;
                if (oldContent?.likes < content.likes) {
                    let check = await UserContent.findOne({
                        where: {
                            userId: model.userId,
                            contentId: content.id,
                            interactionType: "like"
                        }
                    })
                    if (check) return;
                    interaction = new UserContent({
                        userId: model.userId,
                        contentId: content.id,
                        interactionType: "like"
                    })
                    await interaction.save({ transacation: txn })
                }
                else if (oldContent?.shares < content.shares) {
                    let check = await UserContent.findOne({
                        where: {
                            userId: model.userId,
                            contentId: content.id,
                            interactionType: "share"
                        }
                    })
                    if (check) return;
                    interaction = new UserContent({
                        userId: model.userId,
                        contentId: content.id,
                        interactionType: "share"
                    })
                    await interaction.save({ transacation: txn })
                }
                if (oldContent?.likes > content.likes) {
                    await UserContent.destroy({
                        where: {
                            userId: model.userId,
                            contentId: content.id,
                            interactionType: "like"
                        },
                        transaction: txn
                    })
                }

            }
            await Content.update(
                {
                    title: content.title,
                    contentText: content.contentText,
                    topic: content.topic,
                    type: content.type,
                    likes: content.likes,
                    shares: content.shares,
                    approve: content.approve
                },
                {
                    where: {
                        id: content.id
                    }
                }

            )

            await txn.commit();
            return true;
        }
        catch (error) {
            if (txn) await txn.rollback();
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

                    }
                ]
                let qstr = context.preprocess(obj, ["id", "createdBy", "type", "topic"], [], ["createdAt", "DESC"], true, null, includeobj)

                console.log(qstr.where[Object.keys(qstr.where)[0]])
                content = await Content.findAndCountAll(qstr);
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
            txn = await sequelize.transaction();
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

}
