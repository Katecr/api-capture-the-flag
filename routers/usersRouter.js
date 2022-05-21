const express = require("express");


const serviceUser = require("./../services/userService");
const validatorUser = require("./../middlewares/validatorHandler");
const { createUserSchema, updateUserSchema, getUserSchema } = require("./../schemas/userSchema");


const router = express.Router();
const service = new serviceUser();


/*******endpoint/route all user (GET)********/
router.get('/', async(req, res) =>{
  const users = await service.find();
  res.status(200).json(users);
});

/*******endpoint/route detail user (GET)********/
router.get('/:idUser',
  validatorUser(getUserSchema,'params'),
  async(req, res, next) =>{
    try {
      // We obtain the idUser of the url with destructuring
      const { idUser } = req.params;
      const user = await service.findOne(idUser);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
});

/*******endpoint/route create user (POST)********/
router.post('/',
validatorUser(createUserSchema,'body'),
async(req, res) => {
  const body = req.body;
  const newUser = await service.create(body)
  res.status(201).json(newUser);
})

/*******endpoint/route update partial user (PATCH)********/
router.patch('/:idUser',
validatorUser(getUserSchema,'params'),
validatorUser(updateUserSchema,'body'),
async(req, res, next) => {
  try {
    const {idUser } = req.params;
    const body = req.body;
    const userUpdate = await service.update(idUser, body);
    res.status(202).json(userUpdate);
  } catch (error) {
    next(error);
  }
})

/*******endpoint/route delete user (DELETE)********/
router.delete('/:idUser',
validatorUser(getUserSchema,'params'),
async(req, res) => {
  const {idUser } = req.params;
  const responseDelete = await service.update(idUser);
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
