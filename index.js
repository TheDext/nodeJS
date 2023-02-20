const express = require("express");
const chalk = require("chalk");
const {
  addNote,
  getNotes,
  removeNote,
  editNote,
} = require("./notes.controller");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    completed: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    completed: true,
  });
});

app.delete("/:id", async (req, res) => {
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    completed: false,
  });
});

app.put("/", async (req, res) => {
  await editNote(req.body);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    completed: false,
  });
});

app.listen(port, () => {
  console.log(chalk.bgGreen(`Server has been started on port: ${port}`));
});
