import { User } from "./User";
import { connectToMongo, disconnectFromMongo } from "mongo/connector"
import { dropCollection } from "mongo/bindings";

import md5 from "md5";

describe("User Model", () => {

    beforeAll(async (done) => {
        await dropCollection('users');
        done();
    });


    it("should be created", async (done) => {
        const joe = new User({
            name: "Joe",
            password: md5("password")
        });
        await joe.save();
        const users = await User.find({
            name: 'Joe'
        });
        expect(joe._id.toString()).toBe(users[0]._id.toString());

        done();

    })
});
