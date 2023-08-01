import express from "express";
import {
  getCourseList,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourse,
  getAllCourses,
} from "../controller/courses.ctr.js";


const routerCourse = express.Router();

routerCourse.route("/courses")
  .get(getCourseList)
  .post(createCourse);

routerCourse
  .route("/courses/:course_id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

routerCourse.route("/allcourses").get(getAllCourses);
export default routerCourse;
