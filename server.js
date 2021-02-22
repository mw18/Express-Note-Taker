// Dependencies
var express = require("express");
const fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("./assets"));

require("./routing/api-routes")(app);
require("./routing/html-routes")(app);

// Starts the server 
app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
