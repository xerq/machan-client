"use strict";

import React from "react";
import Thread from "./Thread.jsx";

import Divider from "material-ui/Divider";
import Dialog from "material-ui/Dialog";

import API from "../api.js";

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            threads: []
        };

        this.getThreads();
    }

    getThreads() {
        const self = this;

        API.getThreads().then((threads) => {
            self.setState({threads: threads});
        }).catch((error) => {
            self.setState({threads: []});
        });
    }

    render() {
        let threads = [];

        this.state.threads.map((thread) => {
            threads.push(<Thread key={thread._id} threadId={thread._id} userId={thread.userId} text={thread.text} images={thread.images}/>);
        });

        return (
            <div>
                {threads}
            </div>
        );
    }
}

export default Board;
