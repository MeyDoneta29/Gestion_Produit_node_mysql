import express from "express";
import { login, register } from "../controllers/user.controllers.js";
import {validate} from '../middleware/validation.js';
import {registerSchema} from '../validations/authValidation.js';

const router = express.Router();

router.post('/register',validate (registerSchema) , register);
router.post('/login', login);

export default router;