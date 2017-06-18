import React, { Component } from "react";
import { CourseProvider } from "../../providers/CourseProvider";
import { Redirect } from "react-router-dom";
import { CourseUsers } from "./CourseUsers";

/***
 * Course Add component
 *
 * @class CourseAdd
 */
export class CourseAdd extends Component {
    /***
     * @constructor
     */
    constructor() {
        super();
        this.state = {
            header: "Create New course",
            course: {},
        };
    }

    /***
     * Sets proper values to component state, when input field value changes
     *
     * @method setValue
     * @param {String} field
     * @param {Object} event
     */
    setValue(field, event) {
        const state = {};

        state[field] = event.target.value;

        this.setState(state);
    }

    /***
     * This event is triggered when new course form is submitted
     *
     * @event onSubmit
     * @param {Object} event
     */
    onSubmit(event) {
        event.preventDefault();

        const { title, candidate_limit } = this.state;

        CourseProvider.create({ title, candidate_limit }).then(() => {
            this.setState({ backToList: true });
        });
    }

    /***
     * Renders CourseAdd component
     *
     * @method render
     * @returns {XML}
     */
    render() {
        if (this.state.backToList) {
            return (
                <Redirect to="/courses"/>
            );
        }

        return (
            <div>
                <form action="" onSubmit={this.onSubmit.bind(this)}>
                    <div className="card-panel">

                        <h4 className="center">{ this.state.header }</h4>
                        <div className="row">
                            <fieldset>
                                <legend>Course details</legend>

                                <div className="col s12">
                                    <div className="input-field col s6">
                                        <input id="title"
                                            type="text"
                                            onChange={this.setValue.bind(this, "title")}
                                            value={this.state.title}
                                        /> <br/>

                                        <label htmlFor="title" className="active">Title</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input id="title"
                                            type="text"
                                            value={this.state.candidate_limit}
                                            onChange={this.setValue.bind(this, "candidate_limit")}
                                        /> <br/>

                                        <label htmlFor="title" className="active">Candidates Limit</label>
                                    </div>
                                </div>
                            </fieldset>

                            {
                                this.state.candidates ?
                                    <fieldset>
                                        <legend>Course candidates</legend>

                                        <CourseUsers
                                            courseId={this.state.id}
                                            candidates={this.state.candidates}
                                        />
                                    </fieldset>
                                    :
                                    null
                            }

                        </div>
                        <button
                            className="btn"
                            type="submit"
                            value="Save"
                        >
                            Save
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </form> </div>
        );
    }
}
