"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
class Article extends sequelize_1.Model {
}
exports.Article = Article;
Article.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    blogId: {
        type: sequelize_1.DataTypes.INTEGER,
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
        type: sequelize_1.DataTypes.STRING(200),
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
        type: sequelize_1.DataTypes.TEXT,
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
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
        field: "publication_date",
        validate: {
            isDate: {
                args: true,
                msg: "Publication date must be a valid date",
            },
        },
    },
    views: {
        type: sequelize_1.DataTypes.INTEGER,
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
        type: sequelize_1.DataTypes.STRING(8),
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
}, {
    sequelize: db_1.sequelize,
    modelName: "Article",
    tableName: "articles",
    timestamps: false,
});
