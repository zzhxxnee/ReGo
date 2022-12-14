const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const title = "main";
  if (req.session.user) {
    const nickname = req.session.user["nickname"];
    res.render("main", {title: title, nickname: nickname});
  } else {
    res.render("login", {title: title});
  }
});

module.exports = router;
