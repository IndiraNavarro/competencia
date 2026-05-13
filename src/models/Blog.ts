import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Article } from "./Article";

export interface BlogI {
  id?: number;
  name: string;
  creationDate?: Date;
  status: "ACTIVE" | "INACTIVE";
}

export class Blog extends Model<BlogI> implements BlogI {
  public id!: number;
  public name!: string;
  public creationDate!: Date;
  public status!: "ACTIVE" | "INACTIVE";
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Blog name cannot be empty",
        },
        len: {
          args: [3, 150],
          msg: "Blog name must be between 3 and 150 characters",
        },
      },
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "creation_date",
      validate: {
        isDate: {
          args: true,
          msg: "Creation date must be a valid date",
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
    modelName: "Blog",
    tableName: "blogs",
    timestamps: false,
  }
);

Blog.hasMany(Article, {
  foreignKey: "blog_id",
  sourceKey: "id",
});

Article.belongsTo(Blog, {
  foreignKey: "blog_id",
  targetKey: "id",
});