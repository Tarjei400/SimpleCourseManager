import { Model, Schema } from "mongo/bindings";
import { User } from "mongo/models/User";

/***
 * Course GQL Schema
 *
 * @type {string}
 */
export const CourseSchema = `
    type Course {
        _id: Int!
        name: String
        users: [User]
    }
`;

/***
 * Course model schema
 * @type {Object}
 */
const _Course = new Schema({ name: String });

/***
 * Course model
 * @type {Object}
 */
export const Course = Model("course", _Course);

/***
 * @function getAllCourses
 *
 * @returns {Promise.<Array[Course]>}
 * @constructor
 */
async function getAllCourses() {
    return await Course.find({});
}

/***
 *
 * @function getCourse
 *
 * @param {String} name
 * @returns {Promise.<Array[Course]>}
 * @constructor
 */
async function getCourse(parent, { id , name }) {
    return await Course.findOne({ name });
}

/***
 * Returns courses for a particular useer
 *
 * @method getCourseUsers
 * @returns {Promise.<Array[User]>}
 */
async function getCourseUsers(course, { name }) {
    return User.find({});
}

export const RootCourseResolvers = {
    courses: getAllCourses,
    course: getCourse,
};

export const CourseResolvers = { Course: { users: getCourseUsers } };
