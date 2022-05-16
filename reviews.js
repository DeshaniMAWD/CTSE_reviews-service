const express = require("express");
const router = express();
const bodyPharser = require("body-parser");

router.use(bodyPharser.json());

//load mongoose
const mongoose = require("mongoose");

require("./Review")
const Review = mongoose.model("Review");



mongoose.connect("mongodb+srv://Deshani:123456789abc@reviews.6ttko.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", ()=>{
    console.log("Databse is connected");
});


router.post('/addreview', (req,res)=>{
    const { 
        product_id,
        user_id,
        review
       } = req.body;
    
     
    var newReview = new Review({
        product_id,
        user_id,
        review
       
    });
  
    newReview
      .save()
      .then(() => {
        res.json("Review added successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  
});

router.get("/reviewlist", (req, res) => {
    Review.find()
      .then((Review) => {
        res.json(Review);
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.get("/get/:id", (req, res) => {
    let reviewid = req.params.id; 
    Review.findById(reviewid)
      .then((Review) => {
        res.json(Review);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.put("/updatereview/:id", (req, res) => {
    let id = req.params.id;
    const { 
        product_id,
        user_id,
        review
     } = req.body;
  
    const reviewUpdate = {
        product_id,
        user_id,
        review
      
    };
  
    Review.findByIdAndUpdate(id, reviewUpdate)
      .then(() => {
        res.status(200).send({ status: "Review is updated successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error! Cannot Update!" });
        console.log(err.message);
      });
  });

  router.delete("/deletereview/:id",(req, res) => {
    let id = req.params.id;
  
    Review.findByIdAndDelete(id)
      .then(() => {
        res.status(200).send({ status: "Review Deleted!" });
      })
      .catch((err) => {
        res.status(500).send({ status: "Error! Cannot Delete!" });
        console.log(err.message);
      });
  } );





router.listen(4545,()=>{
    console.log("up and running!");
})