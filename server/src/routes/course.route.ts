import { Router } from "express";

import CourseController from "../controllers/course.controller";

export default (controller: CourseController) => {
    const router = Router();

    router
        .post("/", controller.create)
        .get("/", controller.getAll)
        .get("/:id", controller.get)
        .patch("/:id", controller.update)
        .delete("/:id", controller.delete);

    return router;
} 