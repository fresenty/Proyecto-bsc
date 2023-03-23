import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const RecordService = {
  getPetRecords(pet_id) {
    return axios.get(API_URL + "/records/search?pet_id=" + pet_id, {
      headers: authHeader(),
    });
  },

  registerPetRecord(pet_id, date, record, description) {
    date = new Date(date).toISOString();
    return axios.post(
      API_URL + "/records",
      {
        pet_id,
        date,
        record,
        description,
      },
      { headers: authHeader() }
    );
  },
};

export default RecordService;
