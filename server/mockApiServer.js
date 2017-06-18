import jsonServer from "json-server";
import chalk from "chalk";
import axios from "axios";
import { APIUrl } from "./EndpointConfig";

const server = jsonServer.create();
const router = jsonServer.router("./api/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

/***
 * Maps JSON Server response so it matches documentation
 *
 * @function MapCourseWithUsers
 * @param entities
 * @returns {Promise.<*>}
 * @constructor
 */
async function MapCourseWithUsers(entities) {
    return await Promise.all(entities.map(async (v) => {
        const { courseWithUsers } = v;

        if (courseWithUsers) {
            v.candidates = courseWithUsers;
            delete v.courseWithUsers;
        }

        if (v.candidates) {
            v.candidates = await Promise.all(v.candidates.map(async (candidate) => {
                if (candidate.userId) {
                    try {
                        const res = await axios.get(`${APIUrl}/users/${candidate.userId}`);

                        return res.data;
                    } catch (e) {
                        console.log("ERROR: ", e);
                    }
                }
            }));
        }

        return v;
    }));
}

router.render = async (req, res) => {
    let data = res.locals.data;

    if (req.method === "GET" && data.length > 0) {
        data = await MapCourseWithUsers(data);
    }
    res.jsonp({ data });
};

/***
 * Container for all API routes mapping
 *
 * @type {Object} routes
 */
const routes = {
    "/api/courses/:courseId/register/:joinHash": "/courseWithUsers/:joinHash",
    "/api/courses/:courseId/register": "/courseWithUsers?courseId=:courseId&_expand=user",
    "/api/courses/:courseId": "/courses/:courseId",
    "/api/courses": "/courses?_embed=courseWithUsers",
    "/api/users/:userId": "/users/:userId",
    "/api/users": "/users",
};

server.use(jsonServer.rewriter(routes));
server.use(router);

const API_PORT = 3000;

server.listen(API_PORT, () => {
    console.log(chalk.cyan("  \\{^_^}/ hi!"));

    console.info(`==> 🌎 API available on port ${API_PORT}. Open up http://0.0.0.0:${API_PORT}/ in your browser.`);
    console.info(`==> 🌎 ${chalk.bold("Available endpoints:")}`);

    for (const route in routes) {
        console.log(`      ${route} -> ${routes[route]}`);
    }
});
