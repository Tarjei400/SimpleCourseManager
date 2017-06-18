import React, { Component } from "react";
import { UserProvider } from "../../providers/UserProvider";
import { Link } from "react-router-dom";
import _ from "lodash";

/***
 * Custom styles for link
 *
 * @property
 * @type {{cursor: string}}
 */
const LinkStyle = { cursor: "pointer" };

/***
 * User List component
 *
 * @class UserList
 */
export class UserList extends Component {
    /***
     * @constructor
     */
    constructor() {
        super();
        this.state = { users: [] };
    }
    /***
     * Fetches users from api
     *
     * @method fetchUsers
     * @returns {Promise.<Object>}
     */
    async fetchUsers() {
        const users = await UserProvider.getAll();

        this.setState({ users });

        return users;
    }

    /***
     * Triggered when user is about to remove a user
     *
     * @event onRemoveUser
     * @param {Number} userId
     */
    async removeUser(userId) {
        await UserProvider.remove(userId);

        const { users } = this.state;

        _.remove(users, (user) => {
            return user.id === userId;
        });

        this.setState({ users });
    }

    /***
     * Maps users data to DOM elements
     *
     * @method renderUsers
     * @returns {XML}
     */
    renderUsers() {
        const { users } = this.state;

        if (users.length === 0) {
            return (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            );
        }

        return users.map((user) => {
            return (
                <div
                    key={user.id}
                    className="collection-item hoverable">
                    {user.first_name} {user.last_name}
                    <Link className="right"
                        to={{
                            pathname: "/users/edit",
                            state: { user },
                        }}>
                        <i className="material-icons">edit</i>
                    </Link>
                    <a style={LinkStyle} className="right">
                        <i className="material-icons"
                            onClick={this.removeUser.bind(this, user.id)}>delete
                        </i>
                    </a>
                </div>
            );
        });
    }

    /**
     * @event componentWillMount
     */
    componentWillMount() {
        this.fetchUsers();
    }

    /***
     * Renders UserList component
     *
     * @method render
     * @returns {XML}
     */
    render() {
        return (
            <div className="card-panel">
                <div className="collection with-header">
                    <div className="container-header center"><h4>Users List</h4></div>
                    { this.renderUsers() }
                </div>
            </div>
        );
    }
}
