var express = require("express");
var router = express.Router();

/* get all posts*/
router.get("/", async function (req, res, next) {
  res.send("hello");
});

module.exports = router;
