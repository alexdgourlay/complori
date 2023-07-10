const url = 'http://localhost:5000';

/**
 * Courses API functions.
 */
const coursesUrl = `${url}/courses/`

// Get all courses.
export async function getCourses() {
    return fetch(coursesUrl)
        .then(response => response.json())
}

// Create a course.
export async function createCourse(course) {
    return fetch(coursesUrl, {
        method: 'POST',
        body: JSON.stringify(course),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => response.json())
}

// Update a course.
export async function updateCourse(course) {
    return fetch(coursesUrl + course._id, {
        method: 'PATCH',
        body: JSON.stringify(course),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => response.json())
}

// Delete a course.
export async function deleteCourse(id) {
    return fetch(coursesUrl + id, {
        method: 'DELETE'
    }).then(response => response.json())
}

/**
 * Users API functions.
 */
const usersUrl = `${url}/users/`;

// Get all users.
export async function getUsers() {
    return fetch(usersUrl)
        .then(response => response.json())
}