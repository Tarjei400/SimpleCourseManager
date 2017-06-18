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
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">

                        <i className="material-icons">cloud</i>
                        <div>Course manager</div>

                    </a>

                    <div className="right hide-on-med-and-down">
                        <Link to="/users" className="waves-effect waves-light btn">Users </Link>
                        <Link to="/courses" className="waves-effect waves-light btn">Courses </Link>
                    </div>
                </div>
            </nav>
        );
    }
}
