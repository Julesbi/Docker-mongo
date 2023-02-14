const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const DB_URI = "mongodb://mongo:27017/studentFormApp";
const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended: true}));



mongoose.connect(DB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log("Listenning on port: " + PORT);
    app.listen(PORT)
});


// // Create a MongoDB schema for the form data
const studentSchema = new mongoose.Schema({
    name: String,
    andrewID: String,
    course: String,
    grade: String
  });

// Create a MongoDB model for the form data
const Student = mongoose.model("Student", studentSchema);


app.get("/",function(req,res){
    res.sendFile(__dirname + "/public/index.html")
})
app.get("/newpage",function(req,res){
    res.sendFile(__dirname + "/public/newPage.html")
})
app.get("/grades",function(req,res){
    res.sendFile(__dirname + "/public/grades.html")
})
app.get("/all-students",function(req,res){
    Student.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/",function(req,res){
    let newStudent = new Student({
        name: req.body.name,
        andrewID: req.body.andrewID,
        course: req.body.course,
        grade: req.body.grade   
    });
    newStudent.save();
    res.redirect('/newpage');
})
