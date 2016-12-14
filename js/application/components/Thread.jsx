"use strict";

import React from "react";
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import TextTruncate from "react-text-truncate";
import Comment from "./Comment.jsx";

import API from "../api.js";

class Thread extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.state.textExpanded = false;
        this.state.comments = [];

        this.expandText = this.expandText.bind(this);
        this.getCommentsList = this.getCommentsList.bind(this);
        this.getCommentsList();
    }

    expandText() {
        this.setState({textExpanded: true});
    }

    getCommentsList() {
        let threadId = this.props.threadId;

        console.log("threadId", threadId);

        API.getCommentsOfThread(threadId).then((comments) => {
            this.setState({comments: comments});
        }).catch((error) => {
            console.log("Error on getting comments of thread. Error: ", error);
            alert("Error on getting comments of thread");
        });
    }

    render() {
        let expandableButtonVisible = this.props.images.length > 0;

        let comments = [];

        this.state.comments.map((comment) => {
            comments.push(<Comment key={comment} commentId={comment}/>);
        });

        return (
            <div>
                <Card>
                    <CardHeader title="Anonymous" subtitle={this.props.userId} avatar="http://media.wplm.pl/pictures/300x300/crop_north/path/authors/avatar/2015-08/200/200/duda_zaprzysiezenie_avatar.jpg" showExpandableButton={expandableButtonVisible}/>
                    <CardMedia expandable={true}>
                        <img src={this.props.images[0]}/>
                    </CardMedia>
                    <CardText>
                        {this.state.textExpanded
                            ? (
                                <a>{this.props.text}</a>
                            )
                            : (
                                <TextTruncate line={1} truncateText="…" text={this.props.text} textTruncateChild={(<FlatButton onClick={this.expandText} label="Read more"/>)}/>
                            )}
                    </CardText>
                </Card>
                <div style={{
                        "textIndent": "20px"
                    }}>
                    {comments}
                </div>
            </div>
        );
    }
}

export default Thread;
