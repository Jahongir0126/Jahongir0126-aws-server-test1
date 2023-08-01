import { write_file, read_file } from "../utils/fs_api.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

let users = read_file("users.json");

const login = async (req, res) => {
  const { supername, password } = req.body;

  let foundedUser = users.find(
    (u) => u.username === supername || u.email === supername
  );
  if (!foundedUser)
    return res.status(404).send(JSON.stringify({ msg: "User not found" }));

  let checkPsw = await bcrypt.compare(password, foundedUser.password);
  
  if (checkPsw) {
    let token = await jwt.sign(
      { id: foundedUser.id},
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );

    return res.status(200).send({ msg: "Valid user" ,token});
  }

  res.status(404).send({ msg: "password invalid" });
};

export default login;
