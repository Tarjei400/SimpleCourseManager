import path from "path";

export const WebpackConfig = {

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["stage-2", "es2015", "es2016", "es2017"]
                    }
                }
            }
        ]
    }
};