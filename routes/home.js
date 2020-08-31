const express = require("express");
const router = express.Router();


//get au demarage
router.get("/", (req, res) => {
    res.render("index",{title : 'My first ap with pug'});
  });
  
  module.exports = router;