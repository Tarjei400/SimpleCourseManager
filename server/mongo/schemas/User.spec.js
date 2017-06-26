import { User } from "./User";
import { connectToMongo, disconnectFromMongo } from "mongo/connector"

describe("User Model", () => {

    beforeAll( async (done) => {
        await connectToMongo();
        done();
    });
    afterAll(async (done) => {
        await disconnectFromMongo();
        done()
    });

    it("should create user", async (done) => {
        const joe = new User({ name: "Joe" });
        await joe.save();
        done()

    });

});
