import { Application } from "express";
import { BlogController } from "../controllers/blog.controller";

export class BlogRoutes {
  public controller = new BlogController();

  public routes(app: Application): void {
    app.route("/api/blog/public")
      .get(this.controller.getAllBlogs)
      .post(this.controller.createBlog);

    app.route("/api/blog/public/:id")
      .get(this.controller.getBlogById)
      .patch(this.controller.updateBlog)
      .delete(this.controller.deleteBlog);

    app.route("/api/blog/public/:id/logic")
      .delete(this.controller.deleteBlogAdv);
  }
}