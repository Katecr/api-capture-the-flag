const express = require("express");

/******* require service where the business logic lies *******/
const serviceUser = require("./../services/userService");
/******* require data validator *******/
const validatorUser = require("./../middlewares/validatorHandler");
/******* require user data schemas *******/
const { createUserSchema, updateUserSchema, getUserSchema } = require("./../schemas/userSchema");


const router = express.Router();
const service = new serviceUser();


/*******endpoint/route all user (GET)********/
router.get('/', async(req, res, next) =>{
  try {
    const users = await service.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

/*******endpoint/route detail user (GET)********/
router.get('/:id',
  validatorUser(getUserSchema,'params'),
  async(req, res, next) =>{
    try {
      // We obtain the id of the url with destructuring
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
});

/*******endpoint/route create user (POST)********/
router.post('/',
validatorUser(createUserSchema,'body'),
async(req, res,next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body)
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
})

/*******endpoint/route update partial user (PATCH)********/
router.patch('/:id',
validatorUser(getUserSchema,'params'),
validatorUser(updateUserSchema,'body'),
async(req, res, next) => {
  try {
    const {id } = req.params;
    const body = req.body;
    const userUpdate = await service.update(id, body);
    res.status(202).json(userUpdate);
  } catch (error) {
    next(error);
  }
})

/*******endpoint/route delete user (DELETE)********/
router.delete('/:id',
validatorUser(getUserSchema,'params'),
async(req, res, next) => {
  try {
    const {id } = req.params;
    const responseDelete = await service.delete(id);
    res.status(200).json(responseDelete);
  } catch (error) {
    next(error);
  }

})


module.exports = router;
