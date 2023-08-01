import { write_file, read_file } from "../utils/fs_api.js";
import bcrypt from "bcryptjs";
import * as uuid from "uuid";



let users = read_file("users.json");

const register = async(req, res) => {
  const { username, email, password,files} = req.body;
  let foundedUser = users.find((e) => e.email === email);

  if (foundedUser)
    return res.status(400).send({msg:"This username already exists  "});

  const hashPsw = await bcrypt.hash(password, 12);

  users.push({
    id: uuid.v4(),
    username,
    email,
    password: hashPsw,
  });

  write_file("users.json", users);
  res.status(201).send({
    msg: "User registrated",
  });
};

export { register };
