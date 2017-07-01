import { Model, Schema } from "mongo/bindings";

/***
 * User GQL Schema
 *
 * @type {string}
 */
export const UserSchema = `
    type User {
        _id: Int!
        name: String
        password: String
    }
`;

/***
 * User model schema
 * @type {Object}
 */
const _User = new Schema({
    name: String,
    password: String,
});

/***
 * User model
 * @type {Object}
 */
export const User = Model("user", _User);

/***
 * @function getAllUsers
 *
 * @returns {Promise.<Array[User]>}
 * @constructor
 */
async function getAllUsers() {
    return await User.find({});
}

/***
 *
 * @function getUser
 *
 * @param {String} name
 * @returns {Promise.<Array[User]>}
 * @constructor
 */
async function getUser(parent, { name }) {
    return await User.findOne({ name });
}

export const RootUserResolvers = {
    users: getAllUsers,
    user: getUser,
};
