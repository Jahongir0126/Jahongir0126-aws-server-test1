import jwt from "jsonwebtoken";
import { write_file, read_file } from "../utils/fs_api.js";
import * as uuid from "uuid";

let courses = read_file("courses.json");

// get one
const getCourse = async (req, res) => {
  const { course_id } = req.params;
  let getUserInfo = await jwt.verify(req.headers.token, process.env.SECRET_KEY);

  let coursesList = courses.filter((c) => c.user_id === getUserInfo.id);
  if (!coursesList) return res.status(404).send("course not found");
  let oneCourse = coursesList.filter((c) => c.id === course_id);

  return res.status(200).send(oneCourse);
};

// read --- get all
const getCourseList = async (req, res) => {
  let getUserInfo = await jwt.verify(req.headers.token, process.env.SECRET_KEY);

  let getData = courses.filter((c) => c.user_id === getUserInfo.id);
  return res.status(200).send(getData);
};

const getAllCourses = async (req, res) => {
  return res.status(200).send(courses);
};

// create
const createCourse = async (req, res) => {
  const { title, price, author } = req.body;
  let getUserInfo = await jwt.verify(req.headers.token, process.env.SECRET_KEY);

  title && price && author
    ? courses.push({
        user_id: getUserInfo.id,
        id: uuid.v4(),
        title,
        price,
        author,
      })
    : res.send("no data received");
  write_file("courses.json", courses);
  res.status(200).send("Created");
};

// update
const updateCourse = async (req, res) => {
  const { title, price, author } = req.body;
  const { course_id } = req.params;
  let getUserInfo = await jwt.verify(req.headers.token, process.env.SECRET_KEY);

  let courseList = courses.filter((c) => c.user_id === getUserInfo.id);

  let foundedCourse = courseList.find((c) => c.id === course_id);

  if (!foundedCourse) return res.status(400).send("course not found");

  courses.forEach((course) => {
    if (course.id === course_id) {
      course.title = title ? title : course.title;
      course.price = price ? price : course.price;
      course.author = author ? author : course.author;
    }
  });
  write_file("courses.json", courses);

  res.status(200).send({ msg: "Updated" });
};
// delete
const deleteCourse = async (req, res) => {
  const { course_id } = req.params;
  let getUserInfo = await jwt.verify(req.headers.token, process.env.SECRET_KEY);

  let courseList = courses.filter((c) => c.user_id === getUserInfo.id);
  let foundedCourse = courseList.find((c) => c.id === course_id);

  if (!foundedCourse) return res.status(400).send({ msg: "Course not found" });

  courses.forEach((course, idx) => {
    if (course.id === course_id) {
      courses.splice(idx, 1);
    }
  });

  write_file("courses.json", courses);
  res.status(200).send({ msg: "Deleted" });
};

export { getCourseList, createCourse, deleteCourse, updateCourse, getCourse ,getAllCourses};
