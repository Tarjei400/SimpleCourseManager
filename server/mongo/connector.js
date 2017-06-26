import mongoose from "mongoose";
import Config from "config";
import chalk from "chalk";

const { MongoUrl } = Config;

/***
 * Connects to mongo instance
 *
 * @function connect
 * @returns {Promise.<void>}
 */
export async function connectToMongo() {
    mongoose.connection
        .once("open", () => {
            console.log("==> 🌎 Connected to MongoDB");
        })
        .on("error", (error) => {
            console.log(chalk.red(`==> ✖️ MongoDB Error : ${error.message}`));
        });
    return mongoose.connect(MongoUrl);
}


export async function disconnectFromMongo(){
    mongoose.disconnect(function(err){
        if (err){
            console.log(err);
        }
    })
}