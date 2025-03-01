const mongoose = require("mongoose");

const connectDb = async (req,res) => {
    try{
        const connect = await mongoose.connect(process.env.CONSTRING);
        console.log(`The connection has been made to database ${connect.connection.name}`);
    }
    catch(err)
    {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;

