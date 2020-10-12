# fastify_postgis

Routes/index.js file contains all the api's , it is prefixed with /fastify

To GET all users with page number(limit = 10)
http://localhost:3000/fastify/findalluser/1

To POST data
http://localhost:3000/fastify/user

example:
{

   
    "name":"Harsh",
    "description":"kolkata",
    "latitude": 22.5726 ,
    "longitude": 88.3639
    
}
