const express = require("express");
const router = express.Router();

const Joi = require("joi");

const courses = [
    {
      id: 0,
      name: "Education physique",
    },
    {
      id: 1,
      name: "SVT",
    },
    {
      id: 2,
      name: "Histoire",
    },
  ];
//get pour recuperer tout sans specification
router.get("/", (req, res) => {
    res.send(courses);
  });
  
  //post pour mettre ajouter des elements
  router.post("/", (req, res) => {
    const validation = validateCourse(req.body);
    if (validation.error) {
      res.status(400).send(validation.error.details[0].message);
      return;
    }
    const course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    courses.push(course);
    res.send(courses);
  });
  
  //recuperer avec le get et l'id pour un element specifique
  router.get("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
      res.status(404).send("the course is not found");
    } else {
      res.send(courses[parseInt(req.params.id)]);
    }
    res.send();
  });
  
  ///mettre a jour avec la methode put
  router.put("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
      res.status(404).send("the course is not found");
    } else {
      const validation = validateCourse(req.body);
  
      if (validation.error) {
        res.status(400).send(validation.error.details[0].message);
        return;
      }
      course.name = req.body.name;
      res.send(course);
    }
  });
  

  
  //supprimer un cour
  router.delete("/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course) {
      res.status(404).send("the course is not found");
      return;
    } else {
      const index = courses.indexOf(course);
      courses.splice(index, 1);
      res.send(courses);
    }
  }); 
  
  //fonction de validation de requete
  function validateCourse(course) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
    const validation = schema.validate({ name: course.name });
    return validation;
  }

  module.exports = router;