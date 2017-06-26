import express from "express";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../webpack.config.js";
import { server } from "./app";
import Config from "../env/config";

const { AppPort } = Config;

//For development:
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: "client",
    stats: {
        colors: true,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
        modules: false,
    },
});

server.use(middleware);
server.use(webpackHotMiddleware(compiler));
server.use(express.static(`${__dirname}../public`));

server.listen(AppPort, "0.0.0.0", (err) => {
    if (err) {
        console.log(err);
    }
    console.info(`==> 🌎 Application available on port ${AppPort}. Open up http://0.0.0.0:${AppPort}/ in your browser.`);
});
