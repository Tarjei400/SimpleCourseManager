import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { CourseList, CourseAdd, CourseEdit } from "../components/Course";

/***
 * Contains all course oriented components - Add, Update, Display courses
 *
 * @class CoursesLayout
 * @extends Component
 */
export class CoursesLayout extends Component {
    /***
     * @constructor
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
                <Link to="/courses/add">add</Link>
                <Link to="/courses/edit">edit</Link>
                <Link to="/courses">list</Link>
                <Route path={`${this.match.url}`} component={CourseList} exact={true}/>
                <Route path={`${this.match.url}/add`} component={CourseAdd}/>
                <Route path={`${this.match.url}/edit`} component={CourseEdit}/>
            </div>
        );
    }
}
