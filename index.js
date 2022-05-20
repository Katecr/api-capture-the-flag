const express = require("express");
const app = express();
const port = 3000;

/*******Ruta del inicio********/
app.get("/", (req, res) =>{
  res.send('Server in express correct');
});

/*******.listen() función para configurar host y puerto********/
app.listen(port, () =>{
  console.log("Server running: http://localhost:" + `${port}`);
});
