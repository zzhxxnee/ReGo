//회원가입 백
const express = require("express");
const router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");

router.get("/", async (req, res, next) => {
  res.render("signup", {title: "회원가입"});
});

router.post("/", async (req, res, next) => {
  const post = req.body;
  const id = post.id;
  const password = post.password;
  const password_check = post.password_check;
  const nickname = post.nickname;
  const name = post.name;
  const email = post.email;

  if (password == password_check) {
    //pw와 pw확인이 동일한지 확인
    const encrypted_pw = bcrypt.hashSync(password, 10);
    try {
      const data = await pool.query(
        `INSERT INTO user(id, name, nickname, password, email) VALUES (?, ?, ?, ?, ?)`,
        [id, name, nickname, encrypted_pw, email]
      );
      res.write(`<script>window.location="/login"</script>`);
      res.end();
    } catch (err) {
      console.error(err);
      res.write(
        //db에 들어가는 과정에서 오류가 난다면 id가 이미 존재하는 것
        `<script type="text/javascript">alert('This ID is already exist!')</script>`
      );
      res.write('<script>window.location="/signup"</script>');
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
