import urllib3
import json
import os

host = os.getenv('SERVER_HOST', 'localhost')
port = os.getenv('SERVER_PORT', '5000')
url = f"http://{host}:{port}"

http = urllib3.PoolManager()

def create_user(name):
    return http.request(
        "POST",
        url + "/users",
        body=json.dumps({"name": name}),
        headers={"Content-Type": "application/json"},
    ).json()

def create_course(course):
    return http.request(
        "POST",
        url + "/courses",
        body=json.dumps(course),
        headers={"Content-Type": "application/json"},
    ).json()

# Create users.
coach = create_user("Elon Musk")
member_a = create_user("David Bowie")
member_b = create_user("Kurt Cobain")

# Create courses.
course_a = {
    "name": "An introduction to data science with Python",
    "description": "Learn how to use Python to analyze data with the pandas library and Jupyter Notebook.",
    "coach": coach["_id"],
}

create_course(course_a)
print('Created course', f'"{course_a["name"]}"')

course_b = {
    "name": "Building a REST API with Node.js and Typescript",
    "description": "Learn how to build a REST API with Node.js and Typescript",
    "coach": coach["_id"],
    "members": [member_a["_id"], member_b["_id"]],
}

create_course(course_b)
print('Created course', f'"{course_b["name"]}"')

