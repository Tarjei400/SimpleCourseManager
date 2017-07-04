import { Model, Schema } from "mongo/bindings";
import bcrypt from "bcrypt-nodejs";
import { signup, login } from "auth";

/***
 * User GQL type
 *
 * @type {string}
 */
export const UserType = `
    type User {
        _id: Int!
        name: String
        email: String
    }
`;

/***
 * User model schema
 * @type {Object}
 */
const UserSchema = new Schema({
    name: String,
    password: String,
    email: String
});

/***
 * The user's password is never saved in plain text.  Prior to saving the
 * user model, we 'salt' and 'hash' the users password.  This is a one way
 * procedure that modifies the password - the plain text password cannot be
 * derived from the salted + hashed version. See 'comparePassword' to understand
 * how this is used.
 */
UserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

/***
 * User model
 * @type {Object}
 */
export const User = Model("user", UserSchema);

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
 */
async function getUser(parent, { name }) {
    return await User.findOne({ name });
}

/***
 * Creates a new user
 *
 * @function createUser
 * @returns {Promise.<User>}
 */
async function createUser(){

}

/***
 * Updates a user with given id
 *
 * @function updateUser
 * @returns {Promise.<User>}
 */
async function updateUser(){

}

/***
 * Deletes a user with given id
 *
 * @function deleteUser
 * @returns {Promise.<User>}
 */
async function deleteUser(){

}

/***
 * Signs up a new user
 *
 * @function signupUser
 * @param parent
 * @param {Object} user
 * @param {Object} request Context passed to resolver by express
 * @returns {Promise.<void>}
 */
async function signupUser(parent, { name, email, password }, request){
    return await signup({ name, email, password }, request);
}

/***
 * Logs in user
 *
 * @function loginUser
 * @param parent
 * @param {Object} user
 * @param {Object} request Context passed to resolver by express
 * @returns {Promise.<void>}
 */
async function loginUser(parent, { email, password }, request){
    return await login({ email, password }, request);
}

/***
 * Logs out authenticated user
 *
 * @param parent
 * @param args
 * @param request
 * @returns {Promise.<User>}
 */
async function logoutUser(parent, args, request){
    const user = request.user;
    await request.logout();
    return user;
}

/**
 * Exported GQL User API
 *
 * @type {Object}
 */
export const RootUserResolvers = {
    queries: {
        users: getAllUsers,
        user: getUser,
    },
    mutations: {
        createUser,
        deleteUser,
        updateUser,
        signupUser,
        loginUser,
        logoutUser
    }
};
