import React, { Component } from "react";
import { MainMenu } from "../components/MainMenu";
import { withWebSocket } from "../decorators/utils";
import { AppWebSocketUrl } from "../../server/EndpointConfig";

/***
 * Main Skeleton of application
 *
 * @class MainLayout
 * @extends Component
 */
@withWebSocket(`${AppWebSocketUrl}/live`)
export class MainLayout extends Component {
    /***
     * @constructor
     */
    constructor() {
        super();
        this.state = { message: "" };
    }

    /***
     * Handles websocket messages
     *
     * @method handleData
     * @param {Object} data
     */
    handleData(data) {
        console.log("SERVER MESSAGE:", data);
    }

    /***
     * Saves text from textarea to component state
     *
     * @method handleTextChange
     * @param {Object} event
     */
    handleTextChange(event) {
        this.setState({ message: event.target.value });
    }

    /***
     * Sends message to server
     * @method sendMessage
     */
    sendMessage() {
        this.connection.send(JSON.stringify({ message: this.state.message }));
        console.log(this.state.message);
    }

    /***
     * Renders MainLayout component
     *
     * @method render
     * @returns {XML}
     */
    render() {
        return (
            <div className="app">
                <MainMenu/>
                <main>{this.props.children}</main>
                <textarea onChange={this.handleTextChange.bind(this)}/>
                <button onClick={this.sendMessage.bind(this)}>Send message</button>
            </div>
        );
    }
}
