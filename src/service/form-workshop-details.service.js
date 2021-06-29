import axios from "axios";

const API_URL = "http://localhost:8080/api/access/workshopDetails";

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