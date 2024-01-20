import express from "express";
import * as utils from "./utils/utils.js";
import * as db from "./utils/database.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

let projects = [];
let contracts = [];
let mints = [];

const app = express();
app.use(cors());
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res, next) => {
  await db
    .connect()
    .then(async () => {
      // query the databse for project records
      projects = await db.getAllProjects();
      contracts = [];
      mints = [];
      projects.forEach((item) => {
        contracts.push(item.contractAddress);
        mints.push(0); // initializing parallel array
      });
      let featuredRand = Math.floor(Math.random() * projects.length);
      res.render("index.ejs", {
        featuredProject: projects[featuredRand],
        contracts: contracts,
        mints: mints,
        projects: projects,
      });
    })
    .catch(next);
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs", {
    contracts: contracts,
    mints: mints,
    projects: projects,
  });
});

app.get("/project/:id", (req, res) => {
  let id = req.params.id;
  if (id > projects.length) {
    throw new Error("No project with that ID");
  }
  res.render("project.ejs", {
    project: projects[id - 1],
    contracts: contracts,
    mints: mints,
    projects: projects,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/mail", async (req, res) => {
  await utils
    .sendMessage(req.body.sub, req.body.txt)
    .then(() => {
      res.send({ result: "success" });
    })
    .catch(() => {
      res.send({ result: "failure" });
    });
});

app.use(async (err, req, res, next) => {
  console.log(err);
  let msg;
  msg = err.message;
  if (msg != "No project with that ID") {
    msg =
      "There was an internal error. Apologies. We are working on cleaning up the mess.";
  }
  res.render("error.ejs", { msg: msg });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
