const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Done"));
}
async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}
async function removeNote(noteId) {
  const notes = await getNotes();

  const note = notes.find(({ id }) => id === noteId);

  if (!note) {
    return console.log(
      chalk.bgRedBright(`note with id: ${noteId} is not found`)
    );
  }

  await fs.writeFile(
    notesPath,
    JSON.stringify(notes.filter(({ id }) => id !== noteId))
  );

  console.log(chalk.bgGreen(`note with id: ${noteId} has been deleted`));
}
async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Notes list:"));
  notes.forEach(({ title, id }) => {
    console.log(chalk.blue("id:", id, "|", "title:", title));
  });
}
async function editNote(data) {
  const { id: dataId, title: dataTitle } = data;
  const notes = await getNotes();

  const noteTitleIndex = notes.findIndex((note) => note.id === dataId);
  notes[noteTitleIndex].title = dataTitle;
  await fs.writeFile(notesPath, JSON.stringify(notes));
  
  return notes;
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote,
};
