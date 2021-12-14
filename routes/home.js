const express = require("express");
const router = express.Router();





// http GET method
router.get("/", (req, res) => {
    res.render("index",{title:"my express app", greeting: "assalomu alaykum"})
  });
  
  module.exports = router;