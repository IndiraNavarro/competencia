import { Application } from "express";
import { ArticleController } from "../controllers/article.controller";

export class ArticleRoutes {
  public controller = new ArticleController();

  public routes(app: Application): void {
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