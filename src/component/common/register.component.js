import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../service/auth.service";

import UploadServiceRP from "../../service/file.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRadio = this.onChangeRadio.bind(this);

        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: "",
            userType:"",

            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            filemessage:"",

            fileInfos: [],
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeRadio(e) {
        this.setState({
            userType: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.userType,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            ).then(this.upload);
        }
    }

    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    upload() {
        let currentFile = this.state.selectedFiles[0];

        this.setState({
            progress: 0,
            currentFile: currentFile,
        });

        UploadServiceRP.uploadFile(currentFile, this.state.username, this.state.userType, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });

/*        UploadServiceRP.uploadRP(currentFile, this.state.username, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });*/
        })
            .then((response) => {
                this.setState({
                    filemessage: response.data.message,
                });
                return UploadServiceRP.getRPFiles();
            })
            .then((files) => {
                this.setState({
                    fileInfos: files.data,
                });
            })
            .catch(() => {
                this.setState({
                    progress: 0,
                    filemessage: "Could not upload the file!",
                    currentFile: undefined,
                });
            });

        this.setState({
            selectedFiles: undefined,
        });
    }

    render() {

        const {
            selectedFiles,
            currentFile,
            progress,
            message,
            filemessage,
            fileInfos,
        } = this.state;

        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group"
                                     onClick={this.onChangeRadio}
                                >
                                    <label htmlFor="userType">User Type</label>
                                    <Input id="rp" type="radio" value="rp" name="userType"/>
                                    <label htmlFor="rp">Research Publisher</label>
                                    <Input id="wp" type="radio" value="wp" name="userType"/>
                                    <label htmlFor="wp">Workshop Presenter</label>
                                    <Input id="attendee" type="radio" value="attendee" name="userType"/>
                                    <label htmlFor="attendee">Attendee</label>
                                </div>

                                { (this.state.userType == "rp" || this.state.userType == "wp") &&  (
                                    <div>
                                        {currentFile && (
                                            <div className="progress">
                                                <div
                                                    className="progress-bar progress-bar-info progress-bar-striped"
                                                    role="progressbar"
                                                    aria-valuenow={progress}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{ width: progress + "%" }}
                                                >
                                                    {progress}%
                                                </div>
                                            </div>
                                        )}

                                        <label className="btn btn-default">
                                            <input type="file" onChange={this.selectFile} />
                                        </label>

{/*                                        <button
                                            className="btn btn-success"
                                            disabled={!selectedFiles}
                                            type="button"
                                            onClick={this.upload}
                                        >
                                            Upload
                                        </button>*/}

{/*                                        <div className="alert alert-light" role="alert">
                                            {filemessage}
                                        </div>*/}
                                    </div>
                                )}

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        )}

                        {this.state.message && this.state.filemessage && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.filemessage}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>

                    { this.state.userType == "attendee" && (
                        <div>
                            <h4>Payment Here</h4>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}