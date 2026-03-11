import sequelize from "../config/database.js";
import User from "./user.model.js";
import Product from "./prouct.model.js";
import Category from "./category.model.js";

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

export { sequelize, User, Product, Category };