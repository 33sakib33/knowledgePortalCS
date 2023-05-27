import { sequelize } from "../sequelize";
import { Context } from "../utils/StrategyPattern";
import { Comment } from "../models/Comment";
import { QueryTypes } from "sequelize";
import { UserComment } from "../models/UserComment";
import { User } from "../models/User";

export interface ICommentRepo {
    createComment(comment: any): Promise<Comment | any>;
    updateComment(comment: any): Promise<Comment | any>;
    exists(model: any): Promise<boolean>;
    getComment(model: any): Promise<any>;
    deleteComment(model: any): Promise<any>;
}

export class CommentRepository implements ICommentRepo {
    createComment = async (model: any) => {
        let txn;
        try {
            // comment["parentCommentId"]= 1;
            let comment = model.comment

            txn = await sequelize.transaction();
            console.log("hello")
            console.log(model)
            let commentObj = new Comment({
                // parentCommentId: comment.parentCommentId,
                title: comment.title,
                text: comment.text,
                createdBy: model.userId,
                contentId: comment.contentId,
                // createdBy: model.userId
            });
            console.log("hello")

            await commentObj.save({ transaction: txn });

            await txn.commit();
            return true;
        } catch (error) {
            if (txn) await txn.rollback();
            throw Error(error);
        }
    }

    updateComment = async (model: any) => {
        let txn;
        try {
            let comment = model.comment;
            txn = await sequelize.transaction();

            txn = await sequelize.transaction();
            let oldComment = await Comment.findOne({
                where: {
                    id: comment.id
                }
            })
            console.log("hello")
            if (oldComment) {
                let interaction;
                if (oldComment?.likes < comment.likes) {
                    let check = await UserComment.findOne({
                        where: {
                            userId: model.userId,
                            commentId: comment.id,
                            interactionType: "like"
                        }
                    })
                    if (check) return;
                    interaction = new UserComment({
                        userId: model.userId,
                        commentId: comment.id,
                        interactionType: "like"
                    })
                    await interaction.save({ transacation: txn })
                }
                if (oldComment?.likes > comment.likes) {
                    await UserComment.destroy({
                        where: {
                            userId: model.userId,
                            commentId: comment.id,
                            interactionType: "like"
                        },
                        transaction: txn
                    })
                }

            }
            await Comment.update(
                {
                    title: comment.title,
                    text: comment.text,
                    likes: comment.likes
                },
                {
                    where: {
                        id: comment.id
                    },
                    transaction: txn
                }
            );

            await txn.commit();
            return true;
        } catch (error) {
            if (txn) await txn.rollback();
            throw Error(error);
        }
    }

    getComment = async (model: any) => {
        try {
            let context = new Context();
            let comments;
            if (model.searchString) {
                let counter = 0;
                let queryString = `SELECT * FROM comments WHERE `;
                for (let i in model.comment) {
                    if (model.comment[i]) {
                        if (counter >= 1) {
                            queryString += "  AND";
                        }
                        counter++;
                        queryString += `${i} = '${model.comment[i]}' `;
                    }
                }
                if (counter >= 1) {
                    queryString += "  AND";
                }
                queryString += ` title ILIKE '%${model.searchString}%';`;

                console.log(queryString);
                let result = await sequelize.query(queryString, {
                    type: QueryTypes.SELECT
                });

                comments = result;
            } else {
                let includeObj = [
                    {
                        model: User,
                        required: false,


                    }
                ]
                let obj = model;
                let qstr = context.preprocess(
                    obj,
                    ["contentId"],
                    [],
                    ["createdAt", "DESC"],
                    null,
                    null,
                    includeObj
                );
                console.log(qstr.where[Object.keys(qstr.where)[0]]);
                comments = await Comment.findAndCountAll(qstr);
            }

            return comments;
        } catch (error) {
            throw Error(error);
        }
    }

    exists = async (model: any): Promise<boolean> => {
        try {
            let context = new Context();
            let qstr = context.preprocess(model, ["email"], [], [], null, null, null);
            console.log(qstr);
            let comment = await Comment.findOne(qstr);
            console.log(comment);
            if (comment) return true;
            else return false;
        } catch (error) {
            throw Error(error);
        }
    }

    deleteComment = async (model: any) => {
        let txn;
        try {
            txn = await sequelize.transaction();
            await Comment.destroy({
                where: {
                    id: model.id
                },
                transaction: txn
            });

            await txn.commit();
            return true;
        } catch (error) {
            if (txn) await txn.rollback();
            throw Error(error);
        }
    }
}
