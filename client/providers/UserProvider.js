import axios from "axios";
import Config from "../../env/config";

const { APIUrl } = Config;

export class UserProvider {
    /***
     * Returns data of single user with given id
     *
     * @static
     * @method get
     * @param {Number} id
     * @returns {Promise<Object>}
     */
    static async get(id) {
        const ret = await axios.get(`${APIUrl}/users/${id}`);

        return ret.data.data;
    }

    /**
     * Deletes user with specific id
     *
     * @static
     * @method remove
     * @param {Number} id
     * @returns {Promise.<Object>}
     */
    static async remove(id) {
        const ret = await axios.delete(`${APIUrl}/users/${id}`);

        return ret.data;
    }

    /***
     * Creates user with provided data
     *
     * @static
     * @method create
     * @param {Object} userData
     * @returns {Promise.<Object>}
     */
    static async create({ first_name, last_name, gender }) {
        const ret = await axios.post(`${APIUrl}/users`, { first_name, last_name, gender });

        return ret.data;
    }

    /***
     * Updates data for user with specific id
     *
     * @static
     * @method update
     * @param {Number} id
     * @param {Object} userData
     * @returns {Promise.<void>}
     */
    static async update(id, { first_name, last_name, gender }) {
        const ret = await axios.patch(`${APIUrl}/users/${id}`, { first_name, last_name, gender });

        return ret;
    }

    /***
     * Returns data of all stored users
     *
     * @static
     * @method getAll
     * @returns {Promise<Object>}
     */
    static async getAll() {
        const ret = await axios.get(`${APIUrl}/users`);

        return ret.data.data;
    }
}
