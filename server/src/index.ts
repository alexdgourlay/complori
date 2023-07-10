import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';

import courseRouter from './routes/course.route';
import CourseController from './controllers/course.controller';
import CourseService from './services/course.service';

import userRouter from './routes/user.route';
import UserController from './controllers/user.controller';
import UserService from './services/user.service';

const app = express()

// Middleware.
app.use(express.json())
app.use(cors({
  origin: '*'
}));
app.use(express.urlencoded({ extended: true }))

// Log all requests.
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
})

/**
 * COURSES
 */
app.use('/courses', courseRouter(
  new CourseController(
    new CourseService()
  )
));

/**
 * USERS
 */
app.use('/users', userRouter(
  new UserController(
    new UserService()
  )
));

// Default route.
app.use('/', (_req, res) => {
  res.status(200).send();
})

const start = async () => {
  const mongoUrl = "mongodb://username:password@mongo:27017/";
  const port = 5000;

  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB');
    console.error(error);
    return
  }

  app.listen(port, () =>
    console.log(`Server is listening on port ${port}`)
  );
};

start();
