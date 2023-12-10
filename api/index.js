var Express =  require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_SPRING="mongodb+srv://admin:012345678910@cluster0.cjsakvh.mongodb.net/?retryWrites=true&w=majority";






var DATABASENAME = "todoappdb";
var database;

app.listen(5038, ()=>{
    Mongoclient.connect(CONNECTION_SPRING, (error,client)=>{
        database = client.db(DATABASENAME);
        console.log("Mongo DB Connection Succelful");
    })
})

app.get('/api/todoapp/GetNotes', (request, response)=>{
    database.collection("todoappcollection").find({}).toArray((error, result)=>{
        response.send(result);
    });
})

app.post("/api/todoapp/AddNotes",multer().none(), (request, response)=>{
    database.collection("todoappcollection").count({},function(error, numOfDocs){
        database.collection("todoappcollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Successfully");
    })
})

app.delete("/api/todoapp/DeleteNotes", (request, response)=>{
    database.collection("todoappcollection").deleteOne({
        id:request.query.id
    })
    response.json("Deleted Successfully");
})