import axios from "axios";

const api = axios.create({
    baseURL: "https://fedskillstest.coalitiontechnologies.workers.dev",
    auth: {
        username: "coalition",
        password: "skills-test",
    },
});

export default api;