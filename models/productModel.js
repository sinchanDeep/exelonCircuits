const mongoose = require("mongoose");

const productModel = mongoose.Schema({
    prodId :{
        type:String,
        required:true
    },
    productName : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    ratings : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("products",productModel);