

import { IContentRepo, ContentRepository } from "../repository/contentRepository";

export class ContentController {
    private _contentRepository: IContentRepo;

    constructor(Content: IContentRepo) {

        this._contentRepository = Content;

    }

    static getContentInstance(): ContentController {
        let contentRepo = new ContentRepository();
        return new ContentController(contentRepo);
    }
    createContent = async (req, res) => {
        try {
            let contentObject = req.body;
            // let ContentObject = req.body;

            await this._contentRepository.createContent(contentObject);

            return res.status(201).json({
                "status": "created"
            });
        } catch (error) {

            return res.status(404).JSON("failed");
        }
    };

    //Update not required at the moment so not written
    updateContent = async (req, res) => {
        try {
            let ContentObject = req.body;
            console.log(ContentObject)
            await this._contentRepository.updateContent(ContentObject);
            return res.status(200).json({
                "status": "updated"
            });

        } catch (error) {
            return res.status(404).send("failed");

        }
    };

    getContent = async (req, res) => {
        try {
            let model = req.body;
            let ContentList = await this._contentRepository.getContent(model);
            console.log(ContentList)
            res.status(200).send(ContentList);
        }
        catch (error) {
            return res.status(404).send("notFOund");
        }
    }
    deleteContent = async (req, res) => {
        try {
            let model = req.body.content;
            await this._contentRepository.deleteContent(model);
            res.status(200).json({
                "status": "successful"
            });
        }
        catch (error) {
            res.status(401).send(error)
        }
    }
    interact = async (req, res) => {
        try {
            let model = req.body.content;
            await this._contentRepository.interact(model);
            res.status(200).send("deleted");
        }
        catch (error) {
            throw Error(error);
        }
    }
    recommend = async (req, res) => {
        try {
            let model = req.body;
            let recommendations = await this._contentRepository.getRecommendations(model);
            res.status(200).send(recommendations)
        }
        catch (error) {
            res.status(401).send(error)
        }
    }
    addFav = async (req, res) => {
        try {
            let model = req.body;
            console.log(model);
            let status = await this._contentRepository.addFav(model);
            res.status(200).json({
                "status": status
            })
        }
        catch (error) {
            res.status(401).send(error)
        }
    }
    deleteFav = async (req, res) => {
        try {
            let model = req.body;
            console.log(model);
            let status = await this._contentRepository.deleteFav(model);
            if (status == 1) status = false;
            else status = true;
            res.status(200).json({
                "status": status
            })
        }
        catch (error) {
            res.status(401).send(error)
        }
    }
    isFav = async (req, res) => {
        try {
            let model = req.body;
            console.log(model);
            let status = await this._contentRepository.isFav(model);
            res.status(200).json({
                "status": status
            })
        }
        catch (error) {
            res.status(401).send(error)
        }
    }


}
