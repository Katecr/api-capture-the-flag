const express = require("express");
const router = express.Router();


/*******endpoint/route all user (GET)********/
router.get('/', (req, res) =>{
  const users = [];
  // We obtain the size of the query by destructuring
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    users.push({
      id: i,
      name: faker.name.findName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: null,
      role: 'user',
      avatar: faker.image.avatar()
    });
  }
  res.status(200).json(users);
});

/*******endpoint/route detail user (GET)********/
router.get('/:idUser', (req, res) =>{
  // We obtain the idUser of the url with destructuring
  const { idUser } = req.params;
  //
  if(idUser === '999'){
    res.status(404).json({
      message: 'not found'
    });
  }else{
    res.status(200).json([
      {
        idUser,
        user:'user1',
        password:'123456'
      }
    ]);
  }
});

/*******endpoint/route create user (POST)********/
router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
})

/*******endpoint/route update partial user (PATCH)********/
router.patch('/:idUser', (req, res) => {
  const {idUser } = req.params;
  const body = req.body;
  res.status(202).json({
    message: 'Updated',
    data: body,
    idUser
  });
})

/*******endpoint/route delete user (DELETE)********/
router.delete('/:idUser', (req, res) => {
  const {idUser } = req.params;
  res.status(200).json({
    message: 'deleted',
    idUser
  });
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
