import { Router } from "express";
import { addProduct, getProducts,getProduct, updateProduct, deleteProduct } from "../controllers/product.controllers.js";
import {upload} from "../middleware/uploads.js";
import { validate } from "../middleware/validation.js";
import { productSchema } from "../validations/productValidation.js";
import { auth } from "../middleware/auth.js";
const router = Router();

router.post("/",auth, validate(productSchema), upload.single("image"), addProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", auth, validate(productSchema), upload.single("image"), updateProduct);
router.delete("/:id", auth, deleteProduct);
export default router;