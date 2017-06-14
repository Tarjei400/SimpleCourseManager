import { Component } from "react";
import ReactDOM from 'react-dom';

class Root extends Component{

    render() {
        return `
            <div> Root component </div>
        `;

    }
};


ReactDOM.render(
<Root />,
    document.querySelector('body')
);