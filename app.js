const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const ejs = require("ejs");
const multer = require("multer");

const port = 3000;

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));


//로그인 후 세션 유지를 위한 코드
app.use(
  session({
    secret: "my key",
    resave: false,
    saveUninitialize: true,
  })
);

app.use('/public', express.static(__dirname + '/public'));

app.use("/", require("./controllers/main"));
app.use("/signup", require("./controllers/signup"));
app.use("/login", require("./controllers/login"));
app.use("/logout", require("./controllers/logout"));
app.use("/my_goal", require("./controllers/my_goal"));

app.listen(port);
console.log(`app is listening port ${port}`);
