const yargs = require("yargs");
const { addNote, printNotes, removeNote } = require("./notes.controller");

yargs.command({
  command: "add",
  describe: "Add new notes to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note from list by id",
  builder: {
    id: {
      type: "string",
      describe: "note id",
      demandOption: true,
    },
  },
  handler({ id }) {
    removeNote(id);
  },
});

yargs.parse();
