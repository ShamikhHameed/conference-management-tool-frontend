import axios from 'axios'

const API_URL = `http://localhost:8080/api/access/`

class TemplateService {
    uploadTemplateFile(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return axios.post(API_URL + "template/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });

    }

    getTemplateFiles() {
        return axios.get(API_URL + "template/files");
    }
}

export default new TemplateService();