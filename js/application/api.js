"use strict";

import Request from "superagent";

const api = {};

api.protocol = "http";
api.domain = "api.localhost";
api.url = api.protocol + "://" + api.domain;

api.tokenStatus = () => {
    return new Promise((resolve, reject) => {
        Request.get(api.url + "/session/status").withCredentials().end((err, response) => {
            let body = response.text;

            if (err) {
                console.log(`Error on validating token`);
                reject(new Error(`Error on validating token`));
                return;
            }

            let jsonData = JSON.parse(body);

            if (jsonData.error) {
                console.log(`Server returned error. Message: ${jsonData.message}`);
                reject(new Error(`Server returned error`));
                return;
            }

            resolve(jsonData.data.status);
        });
    });
};

api.logIn = (name, password) => {
    return new Promise((resolve, reject) => {
        api.tokenStatus().then((status) => {
            if(status.valid) {
                resolve();
                return;
            }

            Request.post(api.url + "/user/login").withCredentials().send({
                name: name,
                password: password
            }).end((err, response) => {
                let body = response.text;

                if (err) {
                    console.log(`Error on logging in`);
                    reject(new Error(`Error on logging in`));
                    return;
                }

                let jsonData = JSON.parse(body);

                if (jsonData.error) {
                    console.log(`Server returned error. Message: ${jsonData.message}`);
                    reject(new Error(`Server returned error`));
                    return;
                }

                resolve();
            });
        }).catch((error) => {
            reject(new Error(`Error on checking token status. Error: ${error}`));
        });
    });
};

api.getThreads = () => {
    return new Promise((resolve, reject) => {
        Request.get(api.url + "/thread/").withCredentials().end((err, response) => {
            let body = response.text;

            if (err) {
                console.log(`Error on getting threads`);
                reject(new Error(`Error on getting threads`));
                return;
            }

            let jsonData = JSON.parse(body);

            if (jsonData.error) {
                console.log(`Server returned error. Message: ${jsonData.message}`);
                reject(new Error(`Server returned error`));
                return;
            }

            resolve(jsonData.data.threads);
        });
    });
};

api.getCommentsOfThread = (threadId) => {
    return new Promise((resolve, reject) => {
        Request.get(api.url + "/thread/" + threadId + "/comments/").withCredentials().end((err, response) => {
            let body = response.text;

            if (err) {
                console.log(`Error on getting comments of thread`);
                reject(new Error(`Error on getting comments of thread`));
                return;
            }

            let jsonData = JSON.parse(body);

            if (jsonData.error) {
                console.log(`Server returned error. Message: ${jsonData.message}`);
                reject(new Error(`Server returned error`));
                return;
            }

            resolve(jsonData.data.comments);
        });
    });
};

api.getComment = (commentId) => {
    return new Promise((resolve, reject) => {
        Request.get(api.url + "/comment/" + commentId).withCredentials().end((err, response) => {
            let body = response.text;

            if (err) {
                console.log(`Error on getting comment`);
                reject(new Error(`Error on getting comment`));
                return;
            }

            let jsonData = JSON.parse(body);

            if (jsonData.error) {
                console.log(`Server returned error. Message: ${jsonData.message}`);
                reject(new Error(`Server returned error`));
                return;
            }

            resolve(jsonData.data.comment);
        });
    });
};

export default api;
