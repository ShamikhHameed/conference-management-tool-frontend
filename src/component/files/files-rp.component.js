import React, { Component } from "react";
import UploadService from "../../service/files-rp.service";
import AuthService from "../../service/auth.service";

export default class UploadRPFiles extends Component {

    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);

        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",

            fileInfos: [],
            userFileInfo:[],
            userType:"",
        };

        if(AuthService.getCurrentUser() != null){
            for(var i = 0; i < AuthService.getCurrentUser().roles.length; i++){
                if(AuthService.getCurrentUser().roles[i] == "ROLE_REVIEWER"){
                    this.state.userType = "ROLE_REVIEWER";
                    break;
                } else if(AuthService.getCurrentUser().roles[i] == "ROLE_RP"){
                    this.state.userType = "ROLE_RP";
                    break;
                }
            }
        }
    }

    componentDidMount() {
        UploadService.getRPFiles().then((response) => {
            this.setState({
                fileInfos: response.data,
            });
        }).then(() => {
            for(const [key, value] of Object.entries(this.state.fileInfos)){
                if(AuthService.getCurrentUser().username == value.user){
                    this.state.userFileInfo = value;
                }
            }
        });
    }

    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    render() {
        const {
            userFileInfo,
            userType,
            fileInfos,
        } = this.state;

        return (
            <div>
                {userType == "ROLE_REVIEWER" &&  (
                    <div className="card">
                        <div className="card-header">List of Files</div>
                        <ul className="list-group list-group-flush">
                            {fileInfos && fileInfos.map((file, index) => (
                                <li className="list-group-item" key={index}>
                                    {file.name}
                                    <div className="float-lg-end">
                                        <a href={file.url+"/download"} target="_blank">
                                            <button className="btn btn-success btn-margin-right">Download</button>
                                        </a>
                                        <a href={file.url+"/view"} target="_blank">
                                            <button className="btn btn-success">View</button>
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {userType == "ROLE_RP" &&  (
                    <div className="card">
                        <div className="card-header">List of Files</div>
                        <ul className="list-group list-group-flush">
                            {userFileInfo &&
                            <li className="list-group-item" key={0}>
                                {userFileInfo.name}
                                <div className="float-lg-end">
                                    <a href={userFileInfo.url+"/download"} target="_blank">
                                        <button className="btn btn-success btn-margin-right">Download</button>
                                    </a>
                                    <a href={userFileInfo.url+"/view"} target="_blank">
                                        <button className="btn btn-success">View</button>
                                    </a>
                                </div>
                            </li>}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}