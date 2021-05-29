/*
import axios from 'axios'

const API_URL = `http://localhost:8080/api/access/wp/`

class UploadWPFilesService {
    uploadWP(file, name, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);
        formData.append("user", name);
        formData.append("approvalStatus", false);

        return axios.post(API_URL + "upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    getWPFiles() {
        return axios.get(API_URL + "files");
    }
}

export default new UploadWPFilesService();*/
