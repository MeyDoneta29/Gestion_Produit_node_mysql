import {Product, Category} from "../models/index.js";
import fs from "fs";

export const addProduct = async (req, res) => {
    try{
        const {libelle, price, categoryId} = req.body;
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const product = await Product.create({ 
             libelle,
             price,
             categoryId,
             image: req.file ? req.file.filename : null
             });
        return res.status(201).json({ message: "Product added successfully", Product: product });
    }
    catch (err) {
        return res.status(500).json({ message: "Error adding product", error: err.message });
    }

}

export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ 
            include:{
                 model: Category,
                 as: "Category",
                } 
            });
        return res.status(200).json({ message: "Products retrieved successfully", Products: products });
    }
    catch (err) {
        return res.status(500).json({ message: "Error retrieving products", error: err.message });
    }
}

export const getProduct = async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findByPk(id, {
            include:{
                 model: Category,
                 as: "Category",

                } 
            });
       return res.status(200).json({ message: "Product retrieved successfully", Product: product });
    }
    catch (err) {
        return res.status(500).json({ message: "Error retrieving product", error: err.message });
    }

}

export const updateProduct = async (req, res) => {
        const {id} = req.params;
        const {libelle, price, categoryId} = req.body;
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            await product.update({ 
                 libelle,
                 price,
                 categoryId, 
                    image: req.file ? req.file.filename : product.image
                 });
            return res.status(200).json({ message: "Product updated successfully", Product: product });
}
            catch (err) {
                return res.status(500).json({ message: "Error updating product", error: err.message });
            }
        }

export const deleteProduct = async (req, res) => {
    try {
    const {id} = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (product.image != null) {
    fs.unlinkSync(`uploads/${product.image}`);
    }
    
    await product.destroy();
    return res.status(200).json({ message: "Product deleted successfully" });

}
    catch (err) {
        return res.status(500).json({ message: "Error deleting product", error: err.message });
    }

}