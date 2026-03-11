import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    libelle: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    }   
},
{
    timestamps: true,
}
);

export default Product;