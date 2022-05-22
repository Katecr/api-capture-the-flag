const express = require("express");
const router = express.Router();

/*******endpoint/route home********/
router.get('/', (req, res) =>{
  res.send('Server in express correct');
});



/*******endpoint/route missions for user (GET)********/
router.get('/api/users/:idUser/missions', (req, res) =>{
  // Obtenemos el idUser de la url con destructuración
  const { idUser } = req.params;
  res.json([
    {
      idUser,
      missionName:'Misión 1',
      state:'completed'
    }
  ]);
});


module.exports = router;
