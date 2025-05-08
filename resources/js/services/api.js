import axios from "axios";

const api = axios.create({
    baseURL: "/api", // Laravel backend'in kök adresi
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
});

export default api;