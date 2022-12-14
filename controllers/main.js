const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/", async (req, res) => {
  const title = "main";
  if (req.session.user) {
    const nickname = req.session.user["nickname"];
    const goal_list = await pool.query(`SELECT * FROM goal`);
    res.render("main", {
      title: title,
      nickname: nickname,
      goal_list: goal_list[0],
    });
  } else {
    res.render("login", {
      title: title,
    });
  }
});

module.exports = router;
