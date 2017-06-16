import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomeLayout } from "./layouts/HomeLayout";
import { UsersLayout } from "./layouts/UsersLayout";
import { CoursesLayout } from "./layouts/CoursesLayout";

/***
 * Root component of a project
 *
 * @class Root
 */
export class App extends Component {
    /***
     * Renders a component
     *
     * @returns {XML}
     */
    render() {
        return (
            <HashRouter>
                <MainLayout>

                    <Route path="/" component={HomeLayout} exact={true}/>
                    <Route path="/users" component={UsersLayout}/>
                    <Route path="/courses" component={CoursesLayout}/>

                </MainLayout>

            </HashRouter>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#root")
);
