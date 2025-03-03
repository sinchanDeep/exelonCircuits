const asyncHandler = require("express-async-handler");
const productModel = require("../models/productModel"); 

//@desc adds a new product to the Products collection
//@access public for the time being
//@path /api/products/addNewProduct
const addNewProduct = asyncHandler( async (req,res) => {
    const { productName , price , description , ratings } = req.body;
    if(!productName || !price || !description || !ratings){
        res.status(200).json({"message":"All the data must be non empty"});
        return;
    }

    const maxIdProduct = await productModel.findOne({}).sort({prodId:-1});
    const newId = maxIdProduct ? String(Number(maxIdProduct.prodId) + 1) : 1;
    const insert = await productModel.create({productName,
        prodId:(newId),
        price,
        description,
        ratings
    })
    insert ? res.status(200).json({"message":"Successfully inserted"}) : res.status(200).json({"message":"not inserted"});
});

//@desc gets products
//@access public as of now
//@path /api/products/getProducts
const getProducts = asyncHandler( async (req,res) => {
    const {filter,isSort,sortMethod} = req.body;
    if(filter != ""){
        const data = await productModel.find({productName:filter});
        data ? res.status(200).json(data) : res.json({"message":"there was some error"});
        return;
    }
    const data = await productModel.find({});
    if(isSort != ""){
        let sortedData = [];
        if(sortMethod == "asc"){
            switch (isSort) {
                case "ratings":
                    sortedData = data.sort((a, b) => a.ratings - b.ratings); // Sorting by ratings (numerical comparison)
                    break;
                case "description":
                    sortedData = data.sort((a, b) => a.description.localeCompare(b.description)); // Sorting by description (string comparison)
                    break;
                case "price":
                    sortedData = data.sort((a, b) => a.price - b.price); // Sorting by price (numerical comparison)
                    break;
                case "productName":
                    sortedData = data.sort((a, b) => a.productName.localeCompare(b.productName)); // Sorting by product name (string comparison)
                    break;
            }
            data ? res.status(200).json(sortedData) : res.json({ "message": "There was some error" });
        }
        else if (sortMethod == "desc") {
            switch (isSort) {
                case "ratings":
                    sortedData = data.sort((a, b) => b.ratings - a.ratings); // Sorting by ratings (numerical comparison)
                    break;
                case "description":
                    sortedData = data.sort((a, b) => b.description.localeCompare(a.description)); // Sorting by description (string comparison)
                    break;
                case "price":
                    sortedData = data.sort((a, b) => b.price - a.price); // Sorting by price (numerical comparison)
                    break;
                case "productName":
                    sortedData = data.sort((a, b) => b.productName.localeCompare(a.productName)); // Sorting by product name (string comparison)
                    break;
            }
            data ? res.status(200).json(sortedData) : res.json({ "message": "There was some error" });
        }
        
            return;
    }else{
        data ? res.status(200).json(data) : res.status(200).json({"message":"some error occured"});
    }

});

//@desc api to delete a product
//@access public
//@path /api/products/deleteAproduct
const deleteAproduct = asyncHandler( async(req,res) => {
    const {prodId} = req.body;
    if(prodId!=""){
        const remove = await productModel.deleteOne({prodId});
        remove.deletedCount>0 ? res.status(200).json({"message":"deleted succesfully"}) : res.status(200).json("Product nort found");
    }else{
        res.json({"message":"please provide an id"});
    }
})

//@desc api to update a product
//@access public
//@path /api/products/updateAproduct
const updateAproduct = asyncHandler( async (req,res) => {
    const {prodId,updatedPrice} = req.body;
    if(prodId=="" || updatedPrice == ""){
        res.json({"message":"please provide an id or don't leave price blank"});
        return;
    }
    const update = await productModel.findOneAndUpdate({prodId},{$set : {price: updatedPrice}})
    update ? res.json("successfully updated") : res.json("No record with prodId : "+prodId);
});

module.exports = { addNewProduct , getProducts , deleteAproduct,updateAproduct }