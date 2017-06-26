import React, { Component } from "react";
import { CourseProvider } from "../../providers/CourseProvider";
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
 * @class CourseList
 */
export class CourseList extends Component {
    /***
     * @contructor
     */
    constructor() {
        super();
        this.state = { courses: [] };
    }

    /***
     * Fetch courses data
     *
     * @method fetchCourses
     * @returns {Promise.<Object>}
     */
    async fetchCourses() {
        const courses = await CourseProvider.getAll();

        this.setState({ courses });

        return courses;
    }

    /***
     * Triggered on remove course attempt
     *
     * @event onRemoveCourse
     * @param {Number} courseId
     */
    async onRemoveCourse(courseId) {
        await CourseProvider.remove(courseId);
        const { courses } = this.state;

        _.remove(courses, (course) => {
            return course.id === courseId;
        });
        this.setState({ courses });
    }

    /**
     * @event componentWillMount
     */
    componentWillMount() {
        this.fetchCourses();
    }

    /***
     * Renders courses list
     *
     * @method renderCourses
     * @returns {XML}
     */
    renderCourses() {
        const { courses } = this.state;

        if (courses.length === 0) {
            return (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>
            );
        }

        return courses.map((course) => {
            return (
                <div key={course.id} className="collection-item hoverable">

                    { course.title }

                    <Link className="right"
                        to={{
                            pathname: "/courses/edit",
                            state: { course },
                        }}>
                        <i className="material-icons">edit</i>
                    </Link>
                    <a style={LinkStyle} className="right">
                        <i className="material-icons"
                            onClick={this.onRemoveCourse.bind(this, course.id)}>delete
                        </i>
                    </a>
                </div>
            );
        });
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
                    <div className="container-header center"><h4>Courses List</h4></div>
                    { this.renderCourses() }
                </div>
            </div>
        );
    }
}
