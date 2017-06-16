import React, { Component } from "react"
import { MainMenu } from "./MainMenu";

export class MainLayout extends Component {
    /***
     * Renders MainLayout component
     *
     * @method render
     */
    render(){
        return (
            <div className="app">
                <aside className="primary-aside"></aside>
                <MainMenu/>
                <main> { this.props.children } </main>

            </div>
        );
    }
}