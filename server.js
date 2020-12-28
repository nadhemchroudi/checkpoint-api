const express = require("express");
const Person = require("./Model/user");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "./Config/.env") })
const app = express();

mongoose.connect(
  process.env.DB_Connection,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("DB Connected");
  }
);

app.use(express.json());




app.get("/", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.send(persons);
    console.log("persons", persons);
  } catch (error) {
    console.error(error);
  }
});




app.post("/add", async (req, res) => {
  try {
    const newPerson = new Person({
      name: req.body.name,
      age: req.body.age,
      bestFood: req.body.bestFood,
    });
    console.log("before save");
    let savePerson = await newPerson.save();
    console.log(savePerson);
    console.log("after save");
  } catch (err) {
    console.log("err" + err);
    res.status(500).send(err);
  }
});




app.patch("/:updateID", async (req, res) => {
  try {
    const updatedPerson = await Person.updateOne(
      { _id: req.params.updateID },
      {
        $set: {
          name: req.body.name,
          age : req.body.age,
          bestFood: req.body.bestFood,
        }
      }
    );
    console.log(updatedPerson);
  } catch (err) {
    console.log("err" + err);
    res.status(500).send(err);
  }
});



app.delete("/:removeID" , async (req,res) => {
  try{
    const deletePerson = await Person.remove({_id: req.params.removeID})
    console.log(deletePerson); 
  } catch (err) {
    console.log("err" + err);
    res.status(500).send(err);
  }
})




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
