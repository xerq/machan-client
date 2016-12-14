"use strict";

import React from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightTheme from "material-ui/styles/baseThemes/lightBaseTheme";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Panel from "./components/Panel.jsx";
import Board from "./components/Board.jsx";

import API from "./api.js";

API.logIn("admin", "nicepassword").then(() => {
    API.getThreads().then((threads) => {
        console.log("threads", threads);
    }).catch((error) => {
        throw error;
    });
}).catch((error) => {
    throw error;
});

class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [],
            filter: "all"
        };
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(lightTheme)};
    }

    render() {
        return (
            <div>
                <Header/>
                <Panel>
                    <Board/>
                    <Footer/>
                </Panel>
            </div>
        );
    }
}

Application.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default Application;
