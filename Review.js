const mongoose = require("mongoose");

mongoose.model("Review",{
   //product, user, review 
    product_id:{
        type: String,
       
    },
    user_id:{
        type: String,
      
    },
    review:{
        type: String,
      
    }

});