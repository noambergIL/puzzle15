Puzzle 15 
=============================================

Purpose
------------
Simple web app to play Puzzle 15

Setting up a new development environment
----------------------------------------------------
Run

    npm install

Run

    node app.ks

Using the html gui
----------------------------------------------------
go to http://localhost:8081/welcome and you will be able to play the game

Using the restapi
----------------------------------------------------
go to http://localhost:8081/api-docs/ and you will see examples of using the rest-api directly

for example you can start a game by calling
curl -X GET "http://localhost:8081/games?size=4" -H  "accept: application/json"


Tests
---------------------------------------
Example can be found in test\unit folder
Run

    npm test

Please note i have only done some test and wrote down ideas for more tests
for example need to test invalid inputs etc.


Swagger
---------------------------------------
[API documentation](http://localhost:8081/api-docs/)  is generated based on route annotation, see *.route.js files.

Swagger can automaticalliy validate requests if the following code is included in app.js:

    app.use(middleware.swaggerValidator());


See examples here: [Swagger and Node.js](http://mherman.org/blog/2016/05/26/swagger-and-nodejs/#.WSgCjWh96Um)

