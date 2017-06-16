import React, { Component } from "react";
import { Link } from "react-router-dom";

/***
 * Main menu component
 *
 * @class MainMenu
 */
export class MainMenu extends Component {
    /***
     * Renders component
     *
     * @method render
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Link to="/users">Users</Link>
                <Link to="/courses">Courses</Link>
            </div>
        );
    }
}
