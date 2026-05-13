import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface ArticleI {
  id?: number;
  blogId: number;
  title: string;
  content: string;
  publicationDate?: Date;
  views?: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Article extends Model<ArticleI> implements ArticleI {
  public id!: number;
  public blogId!: number;
  public title!: string;
  public content!: string;
  public publicationDate!: Date;
  public views!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "blog_id",
      references: {
        model: "blogs",
        key: "id",
      },
      validate: {
        notNull: {
          msg: "Blog id is required",
        },
        isInt: {
          msg: "Blog id must be an integer",
        },
        min: {
          args: [1],
          msg: "Blog id must be greater than zero",
        },
      },
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Article title cannot be empty",
        },
        len: {
          args: [3, 200],
          msg: "Article title must be between 3 and 200 characters",
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Article content cannot be empty",
        },
        len: {
          args: [10, 100000],
          msg: "Article content must be at least 10 characters",
        },
      },
    },
    publicationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "publication_date",
      validate: {
        isDate: {
          args: true,
          msg: "Publication date must be a valid date",
        },
      },
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: "Views must be an integer",
        },
        min: {
          args: [0],
          msg: "Views cannot be negative",
        },
      },
    },
    status: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: "ACTIVE",
      validate: {
        isIn: {
          args: [["ACTIVE", "INACTIVE"]],
          msg: "Status must be ACTIVE or INACTIVE",
        },
        notEmpty: {
          msg: "Status cannot be empty",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Article",
    tableName: "articles",
    timestamps: false,
  }
);