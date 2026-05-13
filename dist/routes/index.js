"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const article_1 = require("./article");
const blog_1 = require("./blog");
class Routes {
    constructor() {
        // agrega tus rutas aquí de la siguiente manera
        this.articleRoutes = new article_1.ArticleRoutes();
        this.blogRoutes = new blog_1.BlogRoutes();
    }
}
exports.Routes = Routes;
