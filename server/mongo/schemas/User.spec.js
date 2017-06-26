import { User } from "./User";
import { connectToMongo, disconnectFromMongo } from "mongo/connector"

describe("User Model", () => {

    it("should be created", async (done) => {
        const joe = new User({ name: "Joe" });
        await joe.save();
        done()

    });

});
