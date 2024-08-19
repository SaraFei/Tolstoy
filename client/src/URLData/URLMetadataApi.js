import axios from "axios";

let baseUrl = "https://tolstoyserver.onrender.com/api/dataweb";

export const getDataFromServer = (urls) => {
    return axios.post(baseUrl,{urls});
}

