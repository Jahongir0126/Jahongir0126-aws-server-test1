import {
    courseValidation,
  } from "../validation/course.validation.js";
  
  const courseValidate = function (req, res, next) {
    try {
      const { error } = courseValidation(req.body);
      if (error) {
        console.log(error);
        return res.status(400).json({ msg: error.details[0].message });
      }
      next();
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export { courseValidate};
  