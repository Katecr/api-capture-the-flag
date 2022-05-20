const express = require("express");
const app = express();
const port = 3000;

/**********middleware to receive json*************/
app.use(express.json());

/**********Routers*************/
const routerMain = require('./routers/mainRouter.js');

/**********Routers API*************/
const routerUsers = require('./routers/usersRouter.js');
const routerMissions = require('./routers/missionsRouter.js');


/**********Declaring routes*************/
app.use('/', routerMain);

/**********Declaring routes API*************/
app.use('/api/users', routerUsers);
app.use('/api/missions', routerMissions);


/*******.listen() function to configure server and port ********/
app.listen(port, () =>{
  console.log('Server running: http://localhost:' + `${port}`);
});
