import axios from "axios";

axios.defaults.baseURL = 'http://universities.hipolabs.com';

export const fetchUniversity = async (country) => {
    return await axios.get(`/search?country=${country}`)
        .then(response => response.data)
}