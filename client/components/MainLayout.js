import React, { Component } from "react";
import { MainMenu } from "./MainMenu";

/***
 * Main Skeleton of application
 *
 * @class MainLayout
 */
export class MainLayout extends Component {
    /***
     * Renders MainLayout component
     *
     * @method render
     * @returns {XML}
     */
    render() {
        return (
            <div className="app">
                <aside className="primary-aside"></aside>
                <MainMenu/>
                <main> { this.props.children } </main>

            </div>
        );
    }
}
