import axios from 'axios'

import AuthService from "./auth.service";

// const API_URL = `http://localhost:8080/api/access/rp/`
const API_URL = `http://localhost:8080/api/access/`

class UploadRPFilesService {
    uploadFile(file, name, type, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);
        formData.append("user", name);
        formData.append("approvalStatus", false);

        if(type == "rp"){
            return axios.post(API_URL + "rp/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress,
            });
        } else if(type == "wp"){
            return axios.post(API_URL + "wp/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress,
            });
        }

    }

    getRPFiles() {
        return axios.get(API_URL + "rp/files");
    }

    getWPFiles() {
        return axios.get(API_URL + "wp/files");
    }
}

export default new UploadRPFilesService();