import courseModel, { Course } from "../models/course.model";

class CourseService {

    create(course: Course) {
        const newCourse = new courseModel(course);
        return newCourse.save();
    }

    getAll() {
        return courseModel.find({})
            .populate('coach')
            .populate('members');
    }

    get(id: string) {
        return courseModel.findById(id)
            .populate('coach')
            .populate('members');
    }

    update(id: string, course: Course) {
        return courseModel
            .findByIdAndUpdate(id, course, { new: true, runValidators: true });
    }

    delete(id: string) {
        return courseModel.findByIdAndDelete(id);
    }
}

export default CourseService;