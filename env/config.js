import * as local from "./config.local";
import * as docker from "./config.docker";
import * as dockerTests from "./config.dockerTests";

/***
 * Returns proper configuration object depending on NODE_ENV variable
 * It works both on server and client side
 *
 * @param {String} env
 * @returns {*}
 */
function getEnvConfig(env) {
    const configs = {
        local,
        docker,
        dockerTests,
    };

    const config = configs[env];

    if (!config) {
        return local;
    }

    return config;
}

const Config = getEnvConfig(process.env.NODE_ENV);

export default Config;
