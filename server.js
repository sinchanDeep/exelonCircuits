const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDb = require("./connectDb/connectDb");
const scrapeDataFromBrowser = require("./Utilities/scrapeDataFromBrowser");
const errorHandler = require("./errorHandler/errorHandler.js");

const App = express();

connectDb();

scrapeDataFromBrowser();
setInterval(() => {
    scrapeDataFromBrowser();
},3600000);


App.use(express.json());

App.use(errorHandler);

const corsOptions = {
    origin : ['*'],  //for the time being
    methods : ['POST','GET'],
    allowedHeaders : ['Content-Type'],
    credentials : true
};
App.use(cors(corsOptions));

App.use("/api/products",require("./routeHandler/routeHandler.js"));

App.listen(process.env.PORT,()=>{
    console.log(`Server is listening at port ${process.env.PORT}`);
});