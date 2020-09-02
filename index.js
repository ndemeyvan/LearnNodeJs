//THIS SECTION IS FOR MongoDb CRUD OPERATION
const mongoose = require("mongoose");
//connexion a mongoDb
mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Conneced to Mongo Db... "))
  .catch((e) => console.log("Error :", e));
//le schema est peux comme la description de
// la migration ou encore la description du document en question dans notre cas

//le model est la collection en question
// la migration ou encore la description du document en question dans notre cas
const Courses = mongoose.model(
  "Courses",
  new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    tags: [String],
    date: {
      type: Date,
      default: Date.now,
    },
    isPublish: Boolean,
  })
);

async function saveCourse() {
  const course = new Courses({
    name: "React Native",
    author: "Kenfack",
    tags: ["Mobile", "Framwork"],
    isPublish: false,
  });
  //sauvegarder
  try {
    const result = await course.save();
    console.log("Result :", result)
  } catch (error) {
    console.log(error.message);
  }
}

//Query Courses
async function getCourses() {
  //Les comparateurs sont :
  /* 
  eq => Equal to
  ne=>not equal to
  gt => greater than
  gte =>greater than o equal to
  lt => less than 
  lte => less than or equal to
  in
  nin => not in 
  */
  //Les Operateurs logiques sont :
  /*
 OR => ou
  AND=> et

 */
  var pageNumber = 1;
  var pageSize = 10;
  const result = await Courses
    // .find({author:"Mosh Hamadeni" ,isPublish:true})
    // .find({ author: { $eq: "Mosh Hamadeni" }, isPublish: true })
    .find()
    // .or([{author:"Mosh Hamadeni"},{isPublish:false}])
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 }) //ordre croissant
    // .sort({ name: -1 }) //ordre decroissant
    .select({ name: 1, author: 1 });
  // .count();//compte le nombre delement dans la liste

  console.log("result : ", result);
}

async function updateCourse(id) {
  const result = await Courses.findById(id);
  if (!result) {
    console.log("result : ", "No document with this id");
    return;
  } else {
    result.name = "Updated";
    result.isPublish = false;
    const isUpdated = await result.save();
    console.log("isUpdated : ", isUpdated);
  }
}
saveCourse();
// DeleteDocument("5f4e26af7a58e6334b5a3a22");
getCourses();
async function DeleteDocument(id) {
  const result = await Courses.deleteMany({ isPublish: false });
}
//THIS SECTION IS FOR INITIATION TO EXPRESS
/*const express = require("express");
  var dbdebug = require('debug')('app:db')

const app = express();
const helmet = require("helmet");
const morgan = require('morgan');
const auth = require('./logger');
const courses = require('./routes/courses');
const home = require('./routes/home');

//initiation au middleWare
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(auth);
app.use(helmet());
app.use(morgan('tiny'));
app.use('/api/courses',courses);//default view
app.use('/',home);//default view

app.set('view engine','pug');
app.set('views','./views');//default view


dbdebug('Connect to the database ...')

app.listen(3000);
console.log("le serveur ecoute sur le  port : 3000 ...");*/

//THIS SECTION IS FOR ASYNC JS
/*console.log("Before");
getUser(1, displayUser);
console.log("After");

function getUser(id,callBack){
  setTimeout(() => {
    console.log("Reading data from the database");
    callBack( {id: id , gitUserName:"kenfack"} );
 
  }, 2000);
}

function getrepo(user,callBack) {
  setTimeout(() => {
    console.log("Reading repo from the database of user :" + user.gitUserName);
    callBack(["repo1","repo2","repos3"]);
  }, 2000);
}

function displayRepo(repo){
  console.log(repo);
}
function displayUser(user){
  console.log("User :",user);
  getrepo(user,displayRepo)
}*/
