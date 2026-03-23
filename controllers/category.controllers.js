import {Category} from "../models/index.js";

export const addCategory = async (req, res) => {
    await Category.create(req.body)
    .then((category) => {
        res.status(201).json({ message: "Category added successfully", Category: category });
    })
    .catch((err) => {
        res.status(400).json({ message: "Error adding category", error: err.message });
    });

}

export const getCategory = async (req, res) =>{
    try {
        const categories = await Category.findAll();
        res.status(200).json({ message: "Categories retrieved successfully", Category: categories });
    }
    catch (err) {
        res.status(400).json({ message: "Error retrieving categories", error: err.message });
    }
}

export const updateCategory = async (req, res) =>{
    const {id} = req.params;
    const {title} = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }
    // Chagement de la valeur de la categorie vers la nouvelle valeur
    category.title = title;
    try {
        await category.save();
            res.status(200).json({ message: "Category updated successfully", Category: category });
    }    catch (err) {
        return res.status(400).json({ message: "Error updating category", error: err.message });
    }


}

export const deleteCategory = async (req, res) =>{
    const {id} = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
        return res.status(404).json({ message: "Category not found" });
    }
    try {
        await category.destroy();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        return res.status(400).json({ message: "Error deleting category", error: err.message });
    }


}
