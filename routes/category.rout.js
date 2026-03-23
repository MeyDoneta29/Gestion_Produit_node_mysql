import express from "express";
import { addCategory, getCategory, updateCategory, deleteCategory } from "../controllers/category.controllers.js";
import { validate } from "../middleware/validation.js";
import { categorySchema } from "../validations/categoryValidation.js";
const router = express.Router();

router.post("/", validate(categorySchema), addCategory);
router.get("/", getCategory);
router.put("/:id", validate(categorySchema), updateCategory);
router.delete("/:id", validate(categorySchema), deleteCategory);

export default router;