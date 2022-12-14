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

router.post("/write_goal", async (req, res, next) => {
  const post = req.body;

  const goal_content = req.body.goal_content;
  const nickname = req.session.user["nickname"];

  try {
    const data = await pool.query(
      `INSERT INTO goal(goal_user, goal_content) VALUES (?, ?)`,
      [nickname, goal_content]
    );
    const goal_list = await pool.query(`SELECT * FROM goal`);

    res.render("main", {
      title: "main",
      nickname: nickname,
      goal_list: goal_list[0],
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
