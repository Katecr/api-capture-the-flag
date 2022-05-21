const express = require("express");


const serviceUser = require("./../services/userService");
const router = express.Router();
const service = new serviceUser();


/*******endpoint/route all user (GET)********/
router.get('/', (req, res) =>{
  const users = service.find();
  res.status(200).json(users);
});

/*******endpoint/route detail user (GET)********/
router.get('/:idUser', (req, res) =>{
  // We obtain the idUser of the url with destructuring
  const { idUser } = req.params;
  const user = service.findOne(idUser);
  res.status(200).json(user);
});

/*******endpoint/route create user (POST)********/
router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body)
  res.status(201).json(newUser);
})

/*******endpoint/route update partial user (PATCH)********/
router.patch('/:idUser', (req, res) => {
  const {idUser } = req.params;
  const body = req.body;
  const userUpdate = service.update(idUser, body);
  res.status(202).json(userUpdate);
})

/*******endpoint/route delete user (DELETE)********/
router.delete('/:idUser', (req, res) => {
  const {idUser } = req.params;
  const responseDelete = service.update(idUser);
  res.status(200).json(responseDelete);
})




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
