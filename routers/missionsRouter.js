const express = require("express");

/******* require service where the business logic lies *******/
const serviceMission = require("./../services/missionService");
/******* require data validator *******/
const validatorMission = require("./../middlewares/validatorHandler");
/******* require user data schemas *******/
const { createMissionsSchema, updateMissionsSchema, getMissionSchema } = require("./../schemas/missionSchema");

const router = express.Router();
const service = new serviceMission();

/*******endpoint/route all missions (GET)********/
router.get('/', async(req, res, next) =>{
  try {
    const missions = await service.find();
    res.status(200).json(missions);
  } catch (error) {
    next(error);
  }
});

/*******endpoint/route detail mission (GET)********/
router.get('/:id',
validatorMission(getMissionSchema,'params'),
async(req, res, next) =>{
  try {
    const { id } = req.params;
    const mission = await service.findOne(id);
    res.json(mission);
  } catch (error) {
    next(error);
  }
});

/*******endpoint/route create mission (POST)********/
router.post('/',
validatorMission(createMissionsSchema,'body'),
async(req, res, next) => {
  try {
    const body = req.body;
    const newMission = await service.create(body);
    res.status(201).json(newMission);
  } catch (error) {
    next(error);
  }
})

/*******endpoint/route update partial mission (PATCH)********/
router.patch('/:id',
validatorMission(getMissionSchema,'params'),
validatorMission(updateMissionsSchema,'body'),
async(req, res,next) =>{
  const { id } = req.params;
  try {
    const body = req.body;
    const updateMission = await service.update(id,body);
    res.status(200).json({ updateMission})
  } catch(error) {
    next(error);
  }

});

/*******endpoint/route delete mission (DELETE)********/
router.delete('/:id',
validatorMission(getMissionSchema,'params'),
async(req, res, next) =>{
  try {
    const { id } = req.params;
    const responseDelete = await service.delete(id);
    res.status(200).json({responseDelete})
  } catch (error) {
    next(error);
  }
});

module.exports = router;
