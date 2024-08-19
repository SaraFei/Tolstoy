import axios from "axios";

let baseUrl = "http://localhost:4500/api/dataweb";

export const getDataFromServer = (urls) => {
    return axios.post(baseUrl,{urls});
}