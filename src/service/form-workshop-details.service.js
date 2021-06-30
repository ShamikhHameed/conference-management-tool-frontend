import axios from "axios";
import {properties} from "../properties";

const API_URL = properties.apiUrl + "/api/access/workshopDetails";

class FormWorkshopDetailsService {
    submit(title, time, place, startDate, noOfDays, speakers, speakerInstitutes, ) {
        return axios.post(API_URL , {
            // return axios.post(API_URL + "workshopDetails", {
            title,
			time,
			place,
			startDate,
			noOfDays,
			speakers,
			speakerInstitutes,
        });
    }

    updateWorkshopFormDetailsApproval(id){
        return axios.put(API_URL + "/" + id +"/approval");
    }

    getWorkshopFormDetails() {
        // return axios.get(API_URL + "workshopDetails");
        return axios.get(API_URL);
    }

}

export default new FormWorkshopDetailsService();