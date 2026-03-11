import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
},
{
    timestamps: true,
}
);

export default Category;