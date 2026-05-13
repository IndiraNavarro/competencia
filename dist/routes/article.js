"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRoutes = void 0;
const article_controller_1 = require("../controllers/article.controller");
class ArticleRoutes {
    constructor() {
        this.controller = new article_controller_1.ArticleController();
    }
    routes(app) {
        app.route("/api/article/public")
            .get(this.controller.getAllArticles)
            .post(this.controller.createArticle);
        app.route("/api/article/public/:id")
            .get(this.controller.getArticleById)
            .patch(this.controller.updateArticle)
            .delete(this.controller.deleteArticle);
        app.route("/api/article/public/:id/logic")
            .delete(this.controller.deleteArticleAdv);
        app.route("/api/article/public/blog/:blogId")
            .get(this.controller.getArticlesByBlogId);
    }
}
exports.ArticleRoutes = ArticleRoutes;
