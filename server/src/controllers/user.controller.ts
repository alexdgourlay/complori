import { RequestHandler } from "express";

import UserService from "../services/user.service";

class UserController {

    service: UserService;

    constructor(service: UserService) {
        this.service = service;
    }

    create: RequestHandler = async (req, res, next) => {
        try {
            const user = req.body;
            const createdCourse = await this.service.create(user);
            res.json(createdCourse);
        } catch (error) {
            next(error);
        }
    }

    getAll: RequestHandler = async (_req, res, next) => {
        try {
            const courses = await this.service.getAll();
            res.json(courses);
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;