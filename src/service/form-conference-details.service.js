import axios from "axios";
import {properties} from "../properties";

const API_URL = properties.apiUrl + "/api/access/conferenceDetails";

class FormConferenceDetailsService {
    submit(name, institute, startDate, noOfDays, speakers, speakerInstitutes, ) {
        return axios.post(API_URL , {
            // return axios.post(API_URL + "conferenceDetails", {
            name,
			institute,
			startDate,
			noOfDays,
			speakers,
			speakerInstitutes,
        });
    }

    submitF(id,name, institute, startDate, noOfDays, speakers, speakerInstitutes ) {
        return axios.put(API_URL + "/" + id , {
            // return axios.post(API_URL + "conferenceDetails", {
            id,    
            name,
			institute,
			startDate,
			noOfDays,
			speakers,
			speakerInstitutes,
            
        });

    }

    updateConferenceFormDetailsApproval(id){
        return axios.put(API_URL + "/" + id +"/approval");
    }

    getConferenceFormDetails() {
        // return axios.get(API_URL + "conferenceDetails");
        return axios.get(API_URL);
    }

}

export default new FormConferenceDetailsService();