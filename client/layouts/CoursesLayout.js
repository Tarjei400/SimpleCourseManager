import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { CourseList } from "../components/courses/CourseList";
import { CourseAdd } from "../components/courses/CourseAdd";
import { CourseEdit } from "../components/courses/CourseEdit";

/***
 * Contains all course oriented components - Add, Update, Display courses
 *
 * @class CoursesLayout
 * @extends Component
 */
export class CoursesLayout extends Component {
    /***
     * @constructor
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
                <Route path={`${this.match.url}`} component={CourseList} exact={true}/>
                <Route path={`${this.match.url}/add`} component={CourseAdd}/>
                <Route path={`${this.match.url}/edit`} component={CourseEdit}/>
                <Link to="/courses/add" className="btn-floating btn-large red right">
                    <i className="material-icons" >add</i>
                </Link>
            </div>
        );
    }
}
