import axios from "axios";
import { APIUrl } from "../../server/EndpointConfig";
import md5 from "md5";

export class CourseProvider {
    /***
     * Returns data about single course
     *
     * @static
     * @method get
     * @param {Number} id
     * @returns {Promise<Object>}
     */
    static async get(id) {
        const ret = await axios.get(`${APIUrl}/courses/${id}`);

        return ret.data.data;
    }

    /***
     * Returns info about all stored courses
     * @static
     * @method getAll
     * @returns {Promise<Object>}
     */
    static async getAll() {
        const ret = await axios.get(`${APIUrl}/courses`);

        return ret.data.data;
    }

    /**
     * Returns information about users of course with $id
     *
     * @static
     * @method getCourseUsers
     * @param {Number} courseId
     * @returns {Promise.<Object>}
     */
    static async getCourseUsers(courseId) {
        const ret = await axios.get(`${APIUrl}/courses/${courseId}/register`);

        return ret.data.data;
    }

    /**
     * Adds a user to a course
     *
     * @static
     * @method addCourseUsers
     * @param {Number} courseId
     * @param {Number} userId
     * @returns {Promise.<void>}
     */
    static async addCourseUser(courseId, userId) {
        const id = md5(`courseId:${courseId} userId${userId}`);
        const ret = await axios.post(`${APIUrl}/courses/${courseId}/register`, { id, courseId, userId });

        return ret.data;
    }

    /**
     * Removes user from a course
     *
     * @static
     * @method removeCourseUser
     * @param {Number} courseId
     * @param {Number} userId
     * @returns {Promise.<*>}
     */
    static async removeCourseUser(courseId, userId) {
        const id = md5(`courseId:${courseId} userId${userId}`);
        const ret = await axios.delete(`${APIUrl}/courses/${courseId}/register/${id}`);

        return ret.data;
    }

    /***
     * Creates a new course
     *
     * @static
     * @method create
     * @returns {Promise.<Object>}
     */
    static async create({ title, begin, end, candidate_limit }) {
        const ret = await axios.post(`${APIUrl}/courses`, { title, begin, end, candidate_limit });

        return ret.data;
    }

    /***
     * Updates a course with given id
     *
     * @static
     * @method update
     * @param {Number} courseId
     * @param {Object} data
     * @returns {Promise.<Object>}
     */
    static async update(courseId, { title, begin, end, candidate_limit }) {
        const ret = await axios.patch(`${APIUrl}/courses/${courseId}`, { title, begin, end, candidate_limit });

        return ret.data;
    }

    /***
     * Removes course with given id
     *
     * @static
     * @method remove
     * @param {Number} id
     * @returns {Promise.<Object>}
     */
    static async remove(id) {
        const ret = await axios.delete(`${APIUrl}/courses/${id}`);

        return ret.data;
    }
}
