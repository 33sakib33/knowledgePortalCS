import { ICommentRepo, CommentRepository } from "../repository/commentRepository";

export class CommentController {
    private _commentRepository: ICommentRepo;

    constructor(commentRepo: ICommentRepo) {
        this._commentRepository = commentRepo;
    }

    static getCommentInstance(): CommentController {
        const commentRepo = new CommentRepository();
        return new CommentController(commentRepo);
    }

    createComment = async (req, res) => {
        try {
            const commentObject = req.body;
            console.log("hello")
            await this._commentRepository.createComment(commentObject);
            return res.status(201).send("Comment created");
        } catch (error) {
            return res.status(404).send("Failed to create comment");
        }
    };

    updateComment = async (req, res) => {
        try {
            const commentObject = req.body;
            await this._commentRepository.updateComment(commentObject);
            return res.status(200).send("Comment updated");
        } catch (error) {
            return res.status(404).send("Failed to update comment");
        }
    };

    getComment = async (req, res) => {
        try {
            const model = req.body;
            const commentList = await this._commentRepository.getComment(model);
            res.status(200).send(commentList);
        } catch (error) {
            return res.status(404).send("Comment not found");
        }
    };

    deleteComment = async (req, res) => {
        try {
            const model = req.body.comment;
            await this._commentRepository.deleteComment(model);
            res.status(200).send("Comment deleted");
        } catch (error) {
            throw Error(error);
        }
    };


}
