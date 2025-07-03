const mongoose = require('mongoose');

const connectdb = async () =>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("DataBase Connection Established: ", connect.connection.host, connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit();
    }
};
module.exports = connectdb;