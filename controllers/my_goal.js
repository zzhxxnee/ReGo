const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/", async (req, res, next) => {
  const nickname = req.session.user["nickname"];
  try{
   const my_goal = await pool.query(`SELECT * FROM goal WHERE goal_user = ?`, [
    nickname,
  ]);
  res.render("my_goal", {title: "내 목표", my_goal: my_goal[0]});
  }
  catch (err) {
    console.error(err);
  }
});

module.exports = router;
