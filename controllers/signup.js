//회원가입 백
const express = require("express");
const router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");

let check = false;

router.get("/", async (req, res, next) => {
  res.render("signup", {
    title: "회원가입",
  });
});

router.post("/", async (req, res, next) => {
  const post = req.body;
  const id = post.id;
  const password = post.password;
  const password_check = post.password_check;
  const nickname = post.nickname;
  const name = post.name;

  if (password == password_check) {
    //pw와 pw확인이 동일한지 확인
    const encrypted_pw = bcrypt.hashSync(password, 10);
    try {
      const data = await pool.query(
        `INSERT INTO user(id, name, nickname, password) VALUES (?, ?, ?, ?)`,
        [id, name, nickname, encrypted_pw]
      );
      res.write(`<script>window.location="/login"</script>`);
      res.end();
    } catch (err) {
      const id = req.body.id;
      const nick = req.body.nickname;
      const id_list = await pool.query(`SELECT id FROM user`);
      const nickname_list = await pool.query(`SELECT nickname FROM user`);

      // id 중복
      for (var i = 0; i < id_list.length; i++) {
        if (id == id_list[0][i].id) {
          res.write(
            `<script type="text/javascript">alert('This ID is already exist!')</script>`
          );
          res.write('<script>window.location="/signup"</script>');
        }
      }
      // 닉네임 중복
      for (var i = 0; i < nickname_list.length; i++) {
        if (nick == nickname_list[0][i].nickname) {
          res.write(
            `<script type="text/javascript">alert('This Nickname is already exist!')</script>`
          );
          res.write('<script>window.location="/signup"</script>');
        }
      }
    }
    //db에 제대로 들어가면
  } else {
    //password가 다르다면
    res.write(
      `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
    );
    res.write('<script>window.location="/signup"</script>');
  }
});

module.exports = router;
