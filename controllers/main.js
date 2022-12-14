const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/", async (req, res) => {
  const title = "main";
  if (req.session.user) {
    const nickname = req.session.user["nickname"];
    let user_id= await pool.query(`SELECT id FROM user WHERE nickname=? `, [nickname]);
    user_id= user_id[0][0].id;
    const goal_list = await pool.query(`SELECT * FROM goal`);
    const cheer_list = await pool.query(`SELECT * FROM cheer`);

    //응원한 목표들 리스트
   let cheer_goal_list = await pool.query("SELECT g.goal_id, g.goal_content FROM user AS u LEFT OUTER JOIN cheer AS c ON u.id = c.cheer_user_id LEFT OUTER JOIN goal AS g ON c.cheer_goal_id = g.goal_id WHERE u.id = ?",[user_id]);
   let arr = new Array();
   for(let i=0; i<cheer_goal_list[0].length;i++){
      arr[i]=cheer_goal_list[0][i].goal_id;
   }
   arr.sort(function(a, b)  {
    return b - a;
  });


    res.render("main", {
      title: title,
      nickname: nickname,
      user_id: user_id,
      goal_list: goal_list[0],
      cheer_list: cheer_list[0],
      arr: arr

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
    const cheer_list = await pool.query(`SELECT * FROM cheer`);
    let user_id= await pool.query(`SELECT id FROM user WHERE nickname=? `, [nickname]);
    user_id= user_id[0][0].id;

    //응원한 목표들 리스트
    let cheer_goal_list = await pool.query("SELECT g.goal_id, g.goal_content FROM user AS u LEFT OUTER JOIN cheer AS c ON u.id = c.cheer_user_id LEFT OUTER JOIN goal AS g ON c.cheer_goal_id = g.goal_id WHERE u.id = ?",[user_id]);
    let arr = new Array();
    for(let i=0; i<cheer_goal_list[0].length;i++){
       arr[i]=cheer_goal_list[0][i].goal_id;
    }
    arr.sort(function(a, b)  {
     return b - a;
   });
 
    res.render("main", {
      title: "main",
      nickname: nickname,
      user_id: user_id,
      goal_list: goal_list[0],
      cheer_list: cheer_list[0],
      arr: arr
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/cheer_goal", async (req, res, next) => {

  const goal_id = req.body.goal_id;
  const nickname = req.session.user["nickname"];
  let user_id= await pool.query(`SELECT id FROM user WHERE nickname=? `, [nickname]);
  user_id= user_id[0][0].id;

  try {
    const data = await pool.query(
      `INSERT INTO cheer(cheer_goal_id, cheer_user_id) VALUES (?, ?)`, [goal_id, user_id]
    );
    const goal_list = await pool.query(`SELECT * FROM goal`);
    const cheer_list = await pool.query(`SELECT * FROM cheer`);

    //응원한 목표들 리스트
    let cheer_goal_list = await pool.query("SELECT g.goal_id, g.goal_content FROM user AS u LEFT OUTER JOIN cheer AS c ON u.id = c.cheer_user_id LEFT OUTER JOIN goal AS g ON c.cheer_goal_id = g.goal_id WHERE u.id = ?",[user_id]);
    var arr = new Array();
    for(let i=0; i<cheer_goal_list[0].length;i++){
       arr[i]=cheer_goal_list[0][i].goal_id;
    }
    arr.sort(function(a, b)  {
     return b - a;
   });

    res.render("main", {
      title: "main",
      nickname: nickname,
      user_id: user_id,
      goal_list: goal_list[0],
      cheer_list: cheer_list[0],
      arr: arr
      //data: cheer_goal_list
    });
  } catch (err) {
    console.error(err);
  }
});



module.exports = router;