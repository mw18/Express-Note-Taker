//dependencies
const fs = require("fs");
const express = require("express");
const path = require("path");

// Tells node that we are creating an "express" server
const app = express();
// Sets  initial port 
const PORT = process.env.PORT || 8080;

//Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//route to notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET Should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

//route to index.html 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

//POST-receive a new note to save on the request body, add it to the `db.json` file, 
app.post("/api/notes", (req, res) => {
    var createNote = req.body;
    var noteArr = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var notelength = (noteList.length).toString();

    //create new property called id based on length and assign it to each json object
    createNote.id = notelength;
    //push updated note to the data containing notes history in db.json
    noteArr.push(createNote);

    //returns the new note
    fs.writeFileSync("./db/db.json", JSON.stringify(noteArr));
    res.json(noteArr);
})

//DELETE- Receives a query parameter containing the id of a note to delete.
app.delete("/api/notes/:id", (req, res) => {
    var noteArr = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    var noteId = (req.params.id).toString();

    //filter all notes that do not have matching id and saved them as a new array
    noteArr = noteArr.filter(selected =>{
        return selected.id != noteId;
    })

    //write the updated data to db.json and display the updated note
    fs.writeFileSync("./db/db.json", JSON.stringify(noteArr));
    res.json(noteArr);
});

//deployed port 
app.listen(PORT, () => console.log("Server listening on: http://localhost:" + PORT));