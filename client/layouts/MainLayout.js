import React, { Component } from "react";
import { MainMenu } from "../components/MainMenu";

/***
 * Main Skeleton of application
 *
 * @class MainLayout
 * @extends Component
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
                <MainMenu/>
                <main>{this.props.children}</main>
            </div>
        );
    }
}
