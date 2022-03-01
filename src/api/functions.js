import axios from "axios";
import { ENDPOINT } from "../utils/constants";

const axiosApiCall = (url, method, body = {}) =>
  axios({
    method,
    url: `${ENDPOINT}${url}`,
    data: body,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

const signInWithGoogle = async (access_token) => {
  return await axiosApiCall("signInWithGoogle", "post", {
    access_token,
  }).then((res) => res.data.user);
};

const signInWithEmailAndPassword = async ({ email, password }) => {
  return await axiosApiCall("signInWithEmailAndPassword", "post", {
    email,
    password,
  }).then((res) => res.data.user);
};

const signUpWithEmailAndPassword = async ({ name, email, password }) => {
  return await axiosApiCall("signUp", "post", {
    name,
    email,
    password,
  }).then((res) => res.data.user);
};

//TODO: update emails content and reset password page style
const resetPassword = async (email) => {
  const res = await axios
    .post(`${ENDPOINT}reset-password`, {
      email: email,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

const logout = async () => {
  return await axiosApiCall("signOut", "post");
};

const getUsers = async () => {
  const res = await axios
    .get(`${ENDPOINT}users`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        error: true,
        message:
          error?.response?.data?.message ?? JSON.stringify(error.message),
      };
    });

  return res;
};

const getUserById = async (id) => {
  console.log(id);
  const res = await axios
    .get(`${ENDPOINT}user/${id}`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

const deleteUserById = async (id) => {
  console.log(id);
  console.log(JSON.parse(localStorage.getItem("token")));
  const res = await axios
    .delete(`${ENDPOINT}user/${id}`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

const toggleAdminRights = async (id) => {
  const res = await axios
    .put(
      `${ENDPOINT}toggleAdminRights`,
      {
        id: id,
      },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

const getCompanies = async (id) => {
  const res = await axios
    .get(`${ENDPOINT}companies`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

const updateUserById = async (data) => {
  const res = await axios
    .put(
      `${ENDPOINT}user`,
      {
        id: data.id,
        email: data.email,
        name: data.name,
        isAdmin: data.isAdmin,
        isPremium: data.isPremium,
      },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        error: true,
        message:
          error?.response?.data?.message ?? JSON.stringify(error.message),
      };
    });

  return res;
};

const createUser = async (data) => {
  const res = await axios
    .post(
      `${ENDPOINT}user`,
      {
        company_id: data.company_id,
        email: data.email,
        isAdmin: data.isAdmin,
        isPremium: data.isPremium,
        name: data.name,
      },
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error.response.data.message };
    });

  return res;
};

// const signInWithGoogle = async (googleData) => {
//   console.log(googleData);
//   const access_token = googleData.accessToken;

//   const res = await axios
//     .post(
//       `${ENDPOINT}signInWithGoogsigninle`,
//       { data: { access_token } }
//       // {
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       // }
//     )
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       return { error: true, message: error.response.data.message };
//     });

//   return res;
// };

const getUser = async () => {
  return await axiosApiCall("user", "get").then((res) => res.data);
};

export {
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    resetPassword,
    logout,
    getUsers,
    deleteUserById,
    toggleAdminRights,
    getCompanies,
    updateUserById,
    createUser,
    getUserById,
    signInWithGoogle,
    axiosApiCall,
    getUser,
};

