import React, { Component } from "react";
import { CourseProvider } from "../../providers/CourseProvider";
import { UserProvider } from "../../providers/UserProvider";
import _ from "lodash";
import Select from "react-select";

/***
 * This component represents course users and implements logic
 *
 * @class CourseUsers
 */
export class CourseUsers extends Component {
    /***
     * @constructor
     */
    constructor() {
        super();
        this.state = {
            candidates: [],
            availableUsers: [],
        };
    }

    /***
     * Fetch users and narrows it against candidates array
     *
     * @method fetchUsers
     */
    async fetchUsers() {
        const { candidates } = this.props;

        const availableUsers = await UserProvider.getAll();

        for (const candidate of candidates) {
            _.remove(availableUsers, (user) => {
                return user.id === candidate.id;
            });
        }

        this.setState({ availableUsers });
    }

    /***
     * @event componentWillMount
     */
    componentWillMount() {
        this.fetchUsers();
    }

    /***
     * Removes user from candidates list
     *
     * @method removeCandidate
     * @param {Number} userId
     */
    async removeCandidate(userId) {
        const { courseId, candidates } = this.props;

        _.remove(candidates, (candidate) => {
            return candidate.id === userId;
        });

        await CourseProvider.removeCourseUser(courseId, userId);
        await this.fetchUsers();
    }
    /***
     * Triggered When user is selected
     *
     * @event onChange
     * @param {Object} user
     */
    onChange(user) {
        const { availableUsers } = this.state;
        const { candidates } = this.props;

        _.remove(availableUsers, (v) => {
            return user.id === v.id;
        });

        candidates.push(user);

        CourseProvider.addCourseUser(this.props.courseId, user.id);
        this.setState({ availableUsers, candidates });
    }

    /***
     * Maps user data to a DOM elements
     *
     * @method renderUsers
     * @returns {Array.<XML>}
     */
    renderUsers() {
        const { candidates } = this.props;

        return candidates.map((v,k) => {
            return (
                <div key={k} className="chip">
                    {v.first_name} {v.last_name}

                    <i
                        className="close material-icons"
                        onClick={this.removeCandidate.bind(this, v.id)}

                    >close</i>
                </div>
            );
        });
    }

    /***
     * Renders CourseUsers component
     * @method render
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <div className="row">
                    <div className="input-field">
                        {this.renderUsers()}
                    </div>
                    <Select
                        name="form-field-name"
                        value="one"
                        options={this.state.availableUsers.map((v) => {
                            return { ...v, value: v.first_name, label: `${v.first_name} ${v.last_name}` };
                        })}
                        onChange={this.onChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
