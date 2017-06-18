import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { UserList } from "../components/users/UserList";
import { UserAdd } from "../components/users/UserAdd";
import { UserEdit } from "../components/users/UserEdit";

/***
 * Contains all user oriented components - Add, Update, Display users
 *
 * @class UsersLayout
 * @extends Component
 */
export class UsersLayout extends Component {
    /***
     * @contructor
     * @param {Object} match This is a routing object passed from parent component
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

                <Route path={`${this.match.url}`} component={UserList} exact={true}/>
                <Route path={`${this.match.url}/add`} component={UserAdd}/>
                <Route path={`${this.match.url}/edit`} component={UserEdit}/>
                <Link to="/users/add" className="btn-floating btn-large red right">
                    <i className="material-icons" >add</i>
                </Link>
            </div>
        );
    }
}
