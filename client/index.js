import { Component } from "react";
import ReactDOM from 'react-dom';
import index from './index.html';

class Root extends Component {

    render() {
        return `
            <div> Root component </div>
        `;

    }
};

alert("Loaded");
ReactDOM.render(
<Root />,
    document.querySelector('#root')
);