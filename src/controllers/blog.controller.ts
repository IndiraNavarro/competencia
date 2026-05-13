import { Request, Response } from "express";
import { Blog, BlogI } from "../models/Blog";

export class BlogController {
  public async getAllBlogs(req: Request, res: Response) {
    try {
      const blogs: BlogI[] = await Blog.findAll({
        where: { status: "ACTIVE" },
      });

      res.status(200).json({ blogs });
    } catch (error) {
      res.status(500).json({ error: "Error fetching blogs" });
    }
  }

  public async getBlogById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const blog = await Blog.findOne({
        where: {
          id: pk,
          status: "ACTIVE",
        },
      });

      if (blog) {
        res.status(200).json({ blog });
      } else {
        res.status(404).json({ error: "Blog not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching blog" });
    }
  }

  public async createBlog(req: Request, res: Response) {
    const { name, creationDate, status } = req.body;

    try {
      const body: BlogI = {
        name,
        creationDate,
        status,
      };

      const newBlog = await Blog.create({ ...body });

      res.status(201).json(newBlog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateBlog(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { name, creationDate, status } = req.body;

    try {
      const body: BlogI = {
        name,
        creationDate,
        status,
      };

      const blogExist = await Blog.findOne({
        where: {
          id: pk,
          status: "ACTIVE",
        },
      });

      if (blogExist) {
        await blogExist.update(body);

        res.status(200).json(blogExist);
      } else {
        res.status(404).json({ error: "Blog not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteBlog(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const blogToDelete = await Blog.findOne({
        where: { id: pk },
      });

      if (blogToDelete) {
        await blogToDelete.destroy();

        res.status(200).json({ message: "Blog deleted successfully" });
      } else {
        res.status(404).json({ error: "Blog not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting blog" });
    }
  }

  public async deleteBlogAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const blogToUpdate = await Blog.findOne({
        where: {
          id: pk,
          status: "ACTIVE",
        },
      });

      if (blogToUpdate) {
        await blogToUpdate.update({ status: "INACTIVE" });

        res.status(200).json({ message: "Blog marked as inactive" });
      } else {
        res.status(404).json({ error: "Blog not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking blog as inactive" });
    }
  }
}