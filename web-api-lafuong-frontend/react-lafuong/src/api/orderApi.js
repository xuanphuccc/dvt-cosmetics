const { default: axiosClient } = require("./axiosClient");

const orderApi = {
  getAll() {
    const url = "/orders";
    return axiosClient.get(url);
  },

  get(id) {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },

  create(data) {
    const url = "/orders";
    return axiosClient.post(url, data);
  },

  update(id, data) {
    const url = `/orders/${id}`;
    return axiosClient.put(url, data);
  },

  delete(id) {
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  },
};

export default orderApi;
