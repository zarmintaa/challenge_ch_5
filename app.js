const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const swaggerJSON = require("./docs/swagger-docs.json");
const swaggerUI = require("swagger-ui-express");

const userGameRoutes = require("./routes/UserGame");
const userBiodataRoutes = require("./routes/UserGameBiodata");
const userHistoryRoutes = require("./routes/UserGameHistory");
const BiodataRoutes = require("./routes/Biodata");
const userRoutes = require("./routes/User");
const historyRoutes = require("./routes/History");

const { user_game } = require("./models");

const port = 8080;

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

// /api/v1/user/...
app.use("/api/v1/user", userGameRoutes);
// /api/v1/user/biodata/...
app.use("/api/v1/user/biodata", userBiodataRoutes);
// /api/v1/user/history/...
app.use("/api/v1/user/history", userHistoryRoutes);

app.use("/user", userRoutes);

app.use("/history", historyRoutes);

app.use("/biodata", BiodataRoutes);

app.get("/", (req, res, next) => {
  user_game.findAll().then((users) => {
    res.render("home", {
      title: "Home",
      active: true,
      users,
    });
  });
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));
// handler for path 404 not found page
app.use((req, res, next) => {
  res.status(404).render("404");
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  res.status(error.status).json({ message: error.message });
});

// app.listen(port, () => console.log(`App running on port ${port}`));
module.exports = app;
