import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomeLayout } from "./components/HomeLayout";
import { UsersLayout } from "./components/UsersLayout";
import { CoursesLayout } from "./components/CoursesLayout";

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
                    <Route exact={true} path="/" component={HomeLayout} />
                    <Route path="/users" component={UsersLayout}>

                    </Route>
                    <Route path="/courses" component={CoursesLayout}>

                    </Route>
                </MainLayout>
            </HashRouter>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#root")
);
