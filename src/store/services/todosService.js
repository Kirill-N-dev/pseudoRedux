import httpService from "./httpService";

const todosEndpoint = "todos/";
const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: { _page: 1, _limit: 10 },
    }); // async axios get
    return data; // {} пришли
  },
  // Домашка, пробую пост запрос по этомуадресу, чё придёт
  // Если парвильно понял, это симуляция отпарвки на сервер данных и их получения с последующим выводом на фронтенд
  // ДАННЫЕ ОТПАРВОЛЯБЮТСЯ ОБЪЕКТОМ
  create: async () => {
    const { data } = await httpService.post(todosEndpoint, {
      title: "Не знаю, зачем этот тайтл",
      completed: false,
    });
    console.log(data, 333);
    return data;
  },
};

export default todosService;
