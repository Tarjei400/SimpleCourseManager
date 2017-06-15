import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./index.html";

/***
 *
 */
export class Root extends Component {
    /***
     *
     * @returns {Promise}
     */
    async read() {
        const promise = new Promise();

        setTimeout(() => {
            promise.resolve("TEST READ FILE");
        }, 1000);

        return promise;
    }

    /***
     *
     * @returns {Promise.<String>}
     */
    async write() {
        const ret = await this.read();

        alert("Read was done");

        return ret;
    }

    /***
     * Renders a component
     *
     * @returns {XML}
     */
    render() {
        return (
            <div> Root component </div>
        );
    }
}

ReactDOM.render(
    <Root/>,
    document.querySelector("#root")
);
