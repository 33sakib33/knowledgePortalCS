import { Request, Response } from "express";
import { ICategoryRepo, CategoryRepository } from "../repository/categoryRepository";

export class CategoryController {
    private _categoryRepository: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this._categoryRepository = categoryRepo;
    }

    static getCategoryInstance(): CategoryController {
        const categoryRepo = new CategoryRepository();
        return new CategoryController(categoryRepo);
    }

    createCategory = async (req: Request, res: Response) => {
        try {
            const categoryObject = req.body;
            await this._categoryRepository.createCategory(categoryObject);
            return res.status(201).json({
                "status": "created"
            });
        } catch (error) {
            return res.status(404).send("Failed to create category");
        }
    };

    updateCategory = async (req: Request, res: Response) => {
        try {
            const categoryObject = req.body;
            await this._categoryRepository.updateCategory(categoryObject);
            return res.status(200).json({
                "status": "updated"
            });
        } catch (error) {
            return res.status(404).send("Failed to update category");
        }
    };

    getCategory = async (req: Request, res: Response) => {
        try {
            const model = req.body;
            const categoryList = await this._categoryRepository.getCategory(model);
            res.status(200).send(categoryList);
        } catch (error) {
            return res.status(404).send("Category not found");
        }
    };

    deleteCategory = async (req: Request, res: Response) => {
        try {
            const model = req.body;
            await this._categoryRepository.deleteCategory(model);
            res.status(200).send("Category deleted");
        } catch (error) {
            throw Error(error);
        }
    };
}
