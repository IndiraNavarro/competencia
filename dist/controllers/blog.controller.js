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
exports.BlogController = void 0;
const Blog_1 = require("../models/Blog");
class BlogController {
    getAllBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield Blog_1.Blog.findAll({
                    where: { status: "ACTIVE" },
                });
                res.status(200).json({ blogs });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching blogs" });
            }
        });
    }
    getBlogById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const blog = yield Blog_1.Blog.findOne({
                    where: {
                        id: pk,
                        status: "ACTIVE",
                    },
                });
                if (blog) {
                    res.status(200).json({ blog });
                }
                else {
                    res.status(404).json({ error: "Blog not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching blog" });
            }
        });
    }
    createBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, creationDate, status } = req.body;
            try {
                const body = {
                    name,
                    creationDate,
                    status,
                };
                const newBlog = yield Blog_1.Blog.create(Object.assign({}, body));
                res.status(201).json(newBlog);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { name, creationDate, status } = req.body;
            try {
                const body = {
                    name,
                    creationDate,
                    status,
                };
                const blogExist = yield Blog_1.Blog.findOne({
                    where: {
                        id: pk,
                        status: "ACTIVE",
                    },
                });
                if (blogExist) {
                    yield blogExist.update(body);
                    res.status(200).json(blogExist);
                }
                else {
                    res.status(404).json({ error: "Blog not found or inactive" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const blogToDelete = yield Blog_1.Blog.findOne({
                    where: { id: pk },
                });
                if (blogToDelete) {
                    yield blogToDelete.destroy();
                    res.status(200).json({ message: "Blog deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Blog not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting blog" });
            }
        });
    }
    deleteBlogAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const blogToUpdate = yield Blog_1.Blog.findOne({
                    where: {
                        id: pk,
                        status: "ACTIVE",
                    },
                });
                if (blogToUpdate) {
                    yield blogToUpdate.update({ status: "INACTIVE" });
                    res.status(200).json({ message: "Blog marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Blog not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error marking blog as inactive" });
            }
        });
    }
}
exports.BlogController = BlogController;
