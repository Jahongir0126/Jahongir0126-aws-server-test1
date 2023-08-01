import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
// routes
import routers from "./router/routes.js";

dotenv.config();
const port = process.env.PORT || 4000;

const app = express(); 
app.use(cors());
app.use(express.json());
app.use(fileUpload({ limits: { fileSize: 1024 * 1024 * 5 } }));


//  router
app.use(routers);

app.all("*", (req, res) => {  
  res.status(404).send(`<h1>Not Found</h1>`);
});


app.listen(port, () => {
  console.log(port + " port active ");
});
