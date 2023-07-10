import { useState } from "react";

import classes from './courseForm.module.css'

const CourseForm = ({ title, initialCourseData, coaches, onSave }) => {
    
    const [course, setCourse] = useState(initialCourseData);

    const handleChange = (event) => {
        setCourse({
            ...course,
            [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSave?.(course);
    }

    return (
        <>
            <h1 className={classes.title}>{title}</h1>
            <form className={classes.form} onSubmit={handleSubmit}>

                <label className={classes.label}>
                    Name
                    <input
                        id='name'
                        type="text"
                        value={course.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className={classes.label}>
                    Description
                    <textarea
                        id='description'
                        value={course.description}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className={classes.label}>
                    Coach
                    <select
                        id='coach'
                        onChange={handleChange}
                        required
                    >
                        {
                            coaches.map(coach =>
                                <option
                                    key={coach._id}
                                    value={coach._id}>
                                    {coach.name}
                                </option>
                            )
                        }
                    </select>
                </label>

                <button className={classes.submit} type="submit">Save</button>
            </form>
        </>
    )
}

export default CourseForm