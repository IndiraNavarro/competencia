"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const blog_controller_1 = require("../controllers/blog.controller");
class BlogRoutes {
    constructor() {
        this.controller = new blog_controller_1.BlogController();
    }
    routes(app) {
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
exports.BlogRoutes = BlogRoutes;
