const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://webapis:Dragonfly1977@cluster0.8svj0.mongodb.net/ecom?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
exports.handler=async function (event,context){
return {
    statusCode:200,
    body:JSON.stringify({message:"Hello World"})
}
}