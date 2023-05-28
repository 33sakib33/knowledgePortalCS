import { sequelize } from "../sequelize";
import { Category } from "../models/Category";

export interface ICategoryRepo {
    createCategory(category: any): Promise<Category | any>;
    updateCategory(category: any): Promise<Category | any>;
    exists(model: any): Promise<boolean>;
    getCategory(model: any): Promise<any>;
    deleteCategory(model: any): Promise<any>;
}

export class CategoryRepository implements ICategoryRepo {
    createCategory = async (model: any) => {
        let txn;
        try {
            let category = model.category;

            txn = await sequelize.transaction();

            let categoryObj = new Category({
                type: category.type,
                topic: category.topic,
            });

            await categoryObj.save({ transaction: txn });

            await txn.commit();
            return true;
        } catch (error) {
            if (txn) await txn.rollback();
            console.log(error);
            throw Error(error);
        }
    }

    updateCategory = async (model: any) => {
        let txn;
        try {
            let category = model.category;
            txn = await sequelize.transaction();

            let oldCategory = await Category.findOne({
                where: {
                    id: category.id
                }
            });

            if (oldCategory) {
                await Category.update(
                    {
                        type: category.type,
                        topic: category.topic
                    },
                    {
                        where: {
                            id: category.id
                        },
                        transaction: txn
                    }
                );
            }

            await txn.commit();
            return true;
        } catch (error) {
            if (txn) await txn.rollback();
            throw Error(error);
        }
    }

    getCategory = async (model: any) => {
        try {
            let categories = await Category.findAll();

            return categories;
        } catch (error) {
            throw Error(error);
        }
    }

    exists = async (model: any): Promise<boolean> => {
        try {
            let category = await Category.findOne({
                where: {
                    type: model.type
                }
            });

            if (category) return true;
            else return false;
        } catch (error) {
            throw Error(error);
        }
    }

    deleteCategory = async (model: any) => {
        let txn;
        try {
            txn = await sequelize.transaction();

            await Category.destroy({
                where: {
                    id: model.category.id
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
