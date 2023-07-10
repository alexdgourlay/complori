import { RequestHandler } from "express";

import CourseService from "../services/course.service";

class CourseController {

    service: CourseService

    constructor(service: CourseService) {
        this.service = service;
    }

    create: RequestHandler = async (req, res, next) => {
        try {
            const course = req.body;
            const createdCourse = await this.service.create(course);
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

    get: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const course = await this.service.get(id);
            res.json(course);
        } catch (error) {
            next(error);
        }
    }

    update: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const course = req.body;
            const updatedCourse = await this.service.update(id, course);
            res.json(updatedCourse);
        } catch (error) {
            next(error);
        }
    }

    delete: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const course = await this.service.delete(id);
            res.json(course);
        } catch (error) {

        }
    }
}

export default CourseController;