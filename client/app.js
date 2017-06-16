import React, { Component } from "react";
import ReactDOM from "react-dom";
import { FancyList } from "./components/FancyList/FancyList";

/***
 * Root component of a project
 *
 * @class Root
 */
export class App extends Component {
    /***
     * Renders a component
     *
     * @returns {XML}
     */
    render() {
        return (
            <div> This is a Single Web Application <strong> this2 </strong></div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#root")
);
