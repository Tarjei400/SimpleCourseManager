import React, { Component } from "react";
import { UserProvider } from "../../providers/UserProvider";
import { Redirect } from "react-router-dom";

/***
 * User Add component
 *
 * @class UserAdd
 */
export class UserAdd extends Component {
    /***
     * @constructor
     */
    constructor() {
        super();
        this.state = { gender: "m", header: "Create New User" };
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
     * This event is triggered when new user form is submitted
     *
     * @event onSubmit
     * @param {Object} event
     */
    onSubmit(event) {
        event.preventDefault();

        const { first_name, last_name, gender } = this.state;

        UserProvider.create({ first_name, last_name, gender }).then(() => {
            this.setState({ backToList: true });
        });
    }

    /***
     * Renders UserAdd component
     *
     * @method render
     * @returns {XML}
     */
    render() {
        if (this.state.backToList) {
            return (
                <Redirect to="/users"/>
            );
        }

        return (
            <div className="row">
                <form className="card-panel"action="" onSubmit={this.onSubmit.bind(this)}>
                    <h4 className="center">{this.state.header}</h4>
                    <div className="row">
                        <div className="col s12">
                            <div className="input-field col s6">
                                <input
                                    id="first_name" type="text"
                                    className="validate"
                                    onChange={this.setValue.bind(this, "first_name") }
                                    value={this.state.first_name}
                                />
                                <label htmlFor="first_name" className="active">First Name</label>

                            </div>
                            <div className="input-field col s6">
                                <input id="last_name"
                                    type="text"
                                    value={this.state.last_name}
                                    onChange={this.setValue.bind(this, "last_name") }

                                />
                                <label htmlFor="last_name" className="active">Last Name</label>

                            </div>
                        </div>

                    </div>

                    <div className="card-panel">
                        <p>
                            <input id="male"
                                type="radio"
                                name="gender"
                                value="m"
                                onChange={this.setValue.bind(this, "gender") }
                                checked={this.state.gender==="m"}
                            />
                            <label htmlFor="male">Male</label>
                        </p>
                        <p>
                            <input id="female"
                                type="radio"
                                name="gender"
                                value="f"
                                onChange={this.setValue.bind(this, "gender") }
                                checked={this.state.gender==="f"}
                            />
                            <label htmlFor="female">Female</label>

                        </p>
                    </div>
                    <button
                        className="btn waves-effect waves-light"
                        type="submit"
                        value="Save"
                    >
                        Save
                        <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>

        );
    }
}
