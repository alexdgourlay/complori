import { Router } from "express";

import UserController from "../controllers/user.controller";

export default (controller: UserController) => {
    const router = Router();

    router
        .get("/", controller.getAll)
        .post("/", controller.create)

    return router;
} 