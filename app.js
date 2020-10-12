const fastify = require("fastify");
// const bodyParser = require("body-parser");


const app = fastify();






app.register(require("./routes/index"), {prefix  : "/fastify"})

// set port, listen for requests

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});