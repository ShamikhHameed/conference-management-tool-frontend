import axios from 'axios'

const API_URL = `http://localhost:8080/api/access/rp/`

class UploadRPFilesService {
    uploadRP(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return axios.post(API_URL + "upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    getRPFiles() {
        return axios.get(API_URL + "files");
    }
}

export default new UploadRPFilesService();