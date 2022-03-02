import api from "./api";

const apiUsers = {
  async getUsers(cb) {
    const users = await api
      .axiosApiCall("users", "get")
      .then((res) => res.data.users)
      .catch((err) => {
        throw new Error("An error occured while getting users");
      });

    cb(users);
  },
  async deleteUserById(id, cb) {
    await api.axiosApiCall(`user/${id}`, "delete").catch((err) => {
      throw new Error("An error occured while deleting user");
    });

    cb();
  },
  async toggleAdminRights(id, cb) {
    await api.axiosApiCall(`toggleAdminRights`, "put", { id }).catch((err) => {
      throw new Error("An error occured while toggling user admin rights");
    });

    cb();
  },
  async updateUserById(data, cb) {
    await api
      .axiosApiCall(`user`, "put", {
        id: data.id,
        email: data.email,
        name: data.name,
        isAdmin: data.isAdmin,
        isPremium: data.isPremium,
      })
      .catch((err) => {
        throw new Error("An error occured while toggling user admin rights");
      });

    cb();
  },
  async createUser(data, cb) {
    await api
      .axiosApiCall(`user`, "post", {
        email: data.email,
        isAdmin: data.isAdmin,
        isPremium: data.isPremium,
        name: data.name,
      })
      .catch((err) => {
        throw new Error("An error occured while toggling user admin rights");
      });

    cb();
  },
};

export default apiUsers;
