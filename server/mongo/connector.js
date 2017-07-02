import mongoose from "mongoose";
import Config from "config";
import chalk from "chalk";

const { MongoUrl } = Config;

/***
 * Connects to mongo instance
 *
 * @function connectToMongo
 * @returns {Promise.<void>}
 */
export async function connectToMongo() {
    if (process.env.NODE_ENV === "heroku"){
        return;
    }
    mongoose.connection
        .once("open", () => {
            console.log("==> 🌎 Connected to MongoDB");
        })
        .on("error", (error) => {
            console.log(chalk.red(`==> ✖️ MongoDB Error : ${error.message}`));
        });

    return mongoose.connect(MongoUrl);
}

/***
 * Disconnects from mongo instance
 *
 * @function disconnectFromMongo
 * @returns {Promise.<void>}
 */
export async function disconnectFromMongo() {
    mongoose.disconnect(function (err) {
        if (err) {
            console.log(err);
        }
    });
}
