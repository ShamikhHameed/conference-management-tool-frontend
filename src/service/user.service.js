import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/access/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    getEditorBoard() {
        return axios.get(API_URL + 'editor', { headers: authHeader() });
    }

/*    getReviewerBoard() {
        return axios.get(API_URL + 'reviewer', { headers: authHeader() });
    }*/

    getReviewerBoardRP() {
        return axios.get(API_URL + 'reviewer/rp', { headers: authHeader() });
    }

    getReviewerBoardWP() {
        return axios.get(API_URL + 'reviewer/wp', { headers: authHeader() });
    }

    getRPBoard() {
        return axios.get(API_URL + 'rp', { headers: authHeader() });
    }

    getWPBoard() {
        return axios.get(API_URL + 'wp', { headers: authHeader() });
    }

    getAttendeeBoard() {
        return axios.get(API_URL + 'attendee', { headers: authHeader() });
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
}

export default new UserService();