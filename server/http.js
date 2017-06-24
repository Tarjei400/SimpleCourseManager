import express from "express";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../webpack.config.js";
import { server } from "./app";
import { AppPort as port } from "./EndpointConfig";

//For development:
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: "client",
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
    },
});

server.use(middleware);
server.use(webpackHotMiddleware(compiler));
server.use(express.static(`${__dirname}../public`));

server.listen(port, "0.0.0.0", (err) => {
    if (err) {
        console.log(err);
    }
    console.info(`==> 🌎 Application available on port ${port}. Open up http://0.0.0.0:${port}/ in your browser.`);
});
