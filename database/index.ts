import { MongoClient } from "mongodb";
// get mongodb url connect from .env.local
const mongo_connect = process.env['mongo_connect'] ?? ""; 
// check mongo connect in .env.local
if(mongo_connect.length === 0) throw new Error("You need to enter mongodb connect to '.env.local'")

// create MongoCliant with mongo url connect
const cliant = new MongoClient(mongo_connect)

const Database = {
    async checkConnect() {
        // just a function to check connect on mongodb
        // connect collection
        const transactionCollection = cliant.db('api-learnning').collection("transaction");
        // find data in collection
        const fetchData = await transactionCollection.find({})
        // convert dat to array
        const data = fetchData.toArray()
        return data;
    }
}

export default Database 