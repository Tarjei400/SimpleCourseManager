import express from "express";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../webpack.config.js";

const app = express();
const port = 8081;

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

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.use(express.static(`${__dirname}../public`));

app.listen(port, "0.0.0.0", (err) => {
    if (err) {
        console.log(err);
    }
    console.info(`==> 🌎 Listening on port ${port}. Open up http://0.0.0.0:${port}/ in your browser.`);
});
