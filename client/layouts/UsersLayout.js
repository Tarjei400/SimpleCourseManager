import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { UserList, UserAdd, UserEdit } from "../components/User";

/***
 * Contains all user oriented components - Add, Update, Display users
 *
 * @class UsersLayout
 * @extends Component
 */
export class UsersLayout extends Component {
    /***
     * @contructor
     * @param {Object} match
     */
    constructor({ match }) {
        super();
        this.match = match;
    }
    /***
     * Renders component
     *
     * @method render
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Link to="/users/add">add</Link>
                <Link to="/users/edit">edit</Link>
                <Link to="/users">list</Link>
                <Route path={`${this.match.url}`} component={UserList} exact={true}/>
                <Route path={`${this.match.url}/add`} component={UserAdd}/>
                <Route path={`${this.match.url}/edit`} component={UserEdit}/>
            </div>
        );
    }
}
