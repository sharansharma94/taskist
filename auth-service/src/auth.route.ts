import express from "express";

import { register, login } from "./auth.controller.ts";

const router: express.Router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
