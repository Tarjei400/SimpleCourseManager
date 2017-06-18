import React, { Component } from "react";
import { UserProvider } from "../../providers/UserProvider";
import { Link } from "react-router-dom";
import Pager from "react-pager";
import _ from "lodash";

/***
 * Custom styles for link
 *
 * @property
 * @type {{cursor: string}}
 */
const LinkStyle = { cursor: "pointer" };

const USERS_PER_PAGE = 5;

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
        this.state = {
            users: [],
            currentPage: 0,
            pages: 1,
        };
    }
    /***
     * Fetches users from api
     *
     * @method fetchUsers
     * @returns {Promise.<Object>}
     */
    async fetchUsers() {
        const users = await UserProvider.getAll();

        this.setState({ users, pages: Math.ceil(users.length/USERS_PER_PAGE) });

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

        const usersList = users.map((user) => {
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

        return _.chunk(usersList, USERS_PER_PAGE)[this.state.currentPage];
    }

    /**
     * @event componentWillMount
     */
    componentWillMount() {
        this.fetchUsers();
    }

    /***
     * @method handlePageChanged
     * @param {Number} newPage
     */
    handlePageChanged(newPage) {
        this.setState({ currentPage: newPage });
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
                    <Pager
                        total={this.state.pages}
                        current={this.state.currentPage}
                        visiblePages={5}
                        titles={{ first: "<|", last: ">|" }}
                        className="pagination-sm"
                        onPageChanged={this.handlePageChanged.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
