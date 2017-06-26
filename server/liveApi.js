import { server } from "./app";
import Config from "../env/config";
import expressWs from "express-ws";

const { AppHost, AppPort } = Config;

expressWs(server);

const clients = {};

server.ws("/live", function (ws, req) {
    console.info(`==> 🌎 Live API available. Open up ws://${AppHost}:${AppPort}/live in your browser.`);
    ws.on("message", function (msg) {
        const parsedMessage = JSON.parse(msg);

        console.log(JSON.stringify(parsedMessage), typeof(msg));
    });
});
