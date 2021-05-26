import axios from 'axios'

const TUTORIAL_API_URL = 'http://localhost:8080'
const ITEM_API_URL = `${TUTORIAL_API_URL}/api/tutorials`

class ItemDataService {

    retrieveAllItems(name) {
        return axios.get(`${ITEM_API_URL}`);
    }

    deleteItem(id){
        return axios.delete(`${ITEM_API_URL}/${id}`);
    }

    retrieveItem(id) {
        return axios.get(`${ITEM_API_URL}/${id}`);
    }

    updateItem(id, tutorial) {
        return axios.put(`${ITEM_API_URL}/${id}`, tutorial);
    }

    createItem(id, tutorial) {
        return axios.post(`${ITEM_API_URL}/${id}`, tutorial);
    }
}

export default new ItemDataService()