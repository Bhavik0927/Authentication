import express from 'express';
import { LoginUser, RegisterUser,LogOut,GetDetails } from '../Controller/UserController.js';
import { isAuthenticated } from '../middleware/Auth.js';

const router = express.Router();

router.post("/NewUser",RegisterUser);
router.post("/login",LoginUser);

router.get("/logout",LogOut);
router.get('/myProfile',isAuthenticated,GetDetails)

export default router;