import { server } from "./app";
import { AppHost, AppPort as port } from "./EndpointConfig";

require("express-ws")(server);


const clients = {};

server.ws("/live", function (ws, req) {
    console.info(`==> 🌎 Live API available. Open up ws://${AppHost}:${port}/live in your browser.`);
    ws.on("message", function (msg) {
        const parsedMessage = JSON.parse(msg);

        console.log(JSON.stringify(parsedMessage), typeof(msg));
    });
    w;
});
