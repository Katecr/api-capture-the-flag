const express = require("express");
const app = express();
const port = 3000;

/**********middleware to receive json*************/
app.use(express.json());

/**********require cors (to validate connection from other sources)*************/
const cors = require('cors');

/**********use cors*************/
const whitelist = ['http://localhost:3000','http://127.0.0.1:5500'];
const options = {
  origin:(origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));




/**********import middleware errors*************/
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

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


/**********Error middleware always after routing*************/
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



/*******.listen() function to configure server and port ********/
app.listen(port, () =>{
  console.log('Server running: http://localhost:' + `${port}`);
});
