"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const Article_1 = require("../models/Article");
class ArticleController {
    getAllArticles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = yield Article_1.Article.findAll({
                    where: { status: "ACTIVE" },
                });
                res.status(200).json({ articles });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching articles" });
            }
        });
    }
    getArticleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const article = yield Article_1.Article.findOne({
                    where: {
                        id: pk,
                        status: "ACTIVE",
                    },
                });
                if (article) {
                    res.status(200).json({ article });
                }
                else {
                    res.status(404).json({ error: "Article not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching article" });
            }
        });
    }
    getArticlesByBlogId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { blogId } = req.params;
                const articles = yield Article_1.Article.findAll({
                    where: {
                        blogId,
                        status: "ACTIVE",
                    },
                });
                res.status(200).json({ articles });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching articles by blog" });
            }
        });
    }
    createArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { blogId, title, content, publicationDate, views, status, } = req.body;
            try {
                const body = {
                    blogId,
                    title,
                    content,
                    publicationDate,
                    views,
                    status,
                };
                const newArticle = yield Article_1.Article.create(Object.assign({}, body));
                res.status(201).json(newArticle);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { blogId, title, content, publicationDate, views, status, } = req.body;
            try {
                const body = {
                    blogId,
                    title,
                    content,
                    publicationDate,
                    views,
                    status,
                };
                const articleExist = yield Article_1.Article.findOne({
                    where: {
                        id: pk,
                        status: "ACTIVE",
                    },
                });
                if (articleExist) {
                    yield articleExist.update(body);
                    res.status(200).json(articleExist);
                }
                else {
                    res.status(404).json({ error: "Article not found or inactive" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const articleToDelete = yield Article_1.Article.findOne({
                    where: { id: pk },
                });
                if (articleToDelete) {
                    yield articleToDelete.destroy();
                    res.status(200).json({ message: "Article deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Article not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting article" });
            }
        });
    }
    deleteArticleAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const articleToUpdate = yield Article_1.Article.findOne({
                    where: {
                        id: pk,
                        status: "ACTIVE",
                    },
                });
                if (articleToUpdate) {
                    yield articleToUpdate.update({ status: "INACTIVE" });
                    res.status(200).json({ message: "Article marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Article not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking article as inactive" });
            }
        });
    }
}
exports.ArticleController = ArticleController;
