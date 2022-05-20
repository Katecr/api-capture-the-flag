const express = require("express");
const router = express.Router();

/*******endpoint/route home********/
router.get('/', (req, res) =>{
  res.send('Server in express correct');
});


module.exports = router;
