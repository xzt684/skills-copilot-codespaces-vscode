// Create web server
// 1. npm install express
// 2. npm install body-parser
// 3. npm install nodemon
// 4. npm install cors
// 5. npm install mongoose
// 6. npm install path
// 7. npm install ejs

// 1. Import express
const express = require("express");
// 2. Import body-parser
const bodyParser = require("body-parser");
// 3. Import nodemon
const nodemon = require("nodemon");
// 4. Import cors
const cors = require("cors");
// 5. Import mongoose
const mongoose = require("mongoose");
// 6. Import path
const path = require("path");
// 7. Import ejs
const ejs = require("ejs");

// 8. Import routes
const routes = require("./routes/api");

// 9. Create express app
const app = express();

// 10. Set port
const port = process.env.PORT || 5000;

// 11. Connect to database
mongoose.connect("mongodb://localhost/comments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 12. Set up body-parser to handle post requests
app.use(bodyParser.json());

// 13. Set up cors
app.use(cors());

// 14. Set up routes
app.use("/api", routes);

// 15. Set up error handling
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(422).send({ error: err.message });
});

// 16. Set up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// 17. Set up ejs
app.set("view engine", "ejs");

// 18. Set up routes
app.get("/", function (req, res) {
  res.render(path.join(__dirname + "/client/build/index.html"));
});

// 19. Listen for requests
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});