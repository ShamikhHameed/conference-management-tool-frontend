import axios from "axios";
import {properties} from "../properties";

const API_URL = properties.apiUrl + "/api/access/researchPaperDetails";

class FormResearchDetailsService {
    submit(name, title, researchArea, publishedDate, country, author, contributors, contributorTitle, ) {
        return axios.post(API_URL , {
            // return axios.post(API_URL + "researchDetails", {
				name,
				title,
				researchArea,
				publishedDate,
				country,
				author,
				contributors,
				contributorTitle,
        });
    }

    updateResearchFormDetailsApproval(id){
        return axios.put(API_URL + "/" + id +"/approval");
    }

    getResearchFormDetails() {
        // return axios.get(API_URL + "researchDetails");
        return axios.get(API_URL);
    }

}

export default new FormResearchDetailsService();