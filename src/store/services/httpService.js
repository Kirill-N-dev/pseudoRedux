import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
// Домашка, добавил post для запроса
const httpService = { get: axios.get, post: axios.post };

export default httpService;
