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

import API from "../api.js";

class Comment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: {}
        };

        this.getComment = this.getComment.bind(this);
        this.getComment();
    }

    getComment() {
        let commId = this.props.commentId;

        API.getComment(commId).then((comment) => {
            this.setState({
                comment: comment
            });
        }).catch((error) => {
            console.log("Error on getting comment. Error: ", error);
            alert("Error on getting comment");
        });
    }

    render() {
        let footerStyle = {
            display: "block",
            width: "100%",
            textAlign: "center",
            marginTop: "15px"
        };
        return (
            <Card>
                <CardHeader title="Anonymous" subtitle={this.state.comment.userId} actAsExpander={true} showExpandableButton={true}/>
                <CardText>
                    {this.state.comment.text}
                </CardText>
            </Card>
        );
    }
}

export default Comment;
