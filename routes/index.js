const { default: fastify } = require("fastify");
const db = require("../models");

db.sequelize.sync({ force: false }).then(() => {
    console.log("database connected");
  });
const Tutorial = db.tutorials;

async function routes(fastify, option){

  
fastify.post("/user" , (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Name can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    point = { type: 'Point', coordinates: [req.body.longitude,req.body.latitude]}
    const tutorial = {
      id:req.body.id,
      name: req.body.name,
      description: req.body.description,
      location: point,
      longitude : req.body.longitude,
      latitude : req.body.latitude,
      published: req.body.published ? req.body.published : false
        };
    

  
    // Save Tutorial in the database
    Tutorial.create(tutorial)
      .then(data => {
        res.send(`User Created with id : ${data.id} and name : ${data.name}`);
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });

   })

fastify.get("/findalluser/:id" , (req, res) => {
    let limit = 10
    Tutorial.findAll({
      limit: limit,
      offset: 0 + (req.params.id - 1) * limit
     })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  })

fastify.get("/finduser/:id", (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
});

fastify.put("/user/:id",(req, res) => {
  const id = req.params.id;

  Tutorial.update(
    // Set Attribute values 
         req.body ,
    // Where clause / criteria 
        { where:{id :id } }    
  
   ).then(user=>{
       res.send(`User updated successfully !!`);
   }).catch(err=>{
       res.send(err)
   })
})

fastify.delete("/user/:id", (req, res) => {
  

  Tutorial.destroy({ where:{id : req.params.id } } )
    .then(num => {
        res.send(`User with id: ${req.params.id} was deleted successfully!`)
      })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
});


    
}


module.exports = routes;
