console.log("Initializing server...");

const express = require("express");
const app = express();

//Configure passport settings
require("./services/passport");

//Setup auth related routes
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, params => {
  console.log("Server initialization complete.");

  console.log("Server listening on port " + PORT + ".");
});
