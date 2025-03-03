
const productModel = require("../models/productModel");



const insertScrape = async (products) => {
    //console.log(products);
    const insert = await productModel.create(products);
    if(insert){
        console.log("successfully inserted data to the database");
    }
    else{
        console.log("There was some error inserting to database");
    }
}

module.exports = insertScrape;