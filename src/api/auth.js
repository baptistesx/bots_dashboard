import axios from "axios";
import { ENDPOINT } from "../utils/constants";

// TODO: is it good to catch Errors here?

const apiAuth = {
  // All api requests are made thanks to this function
  async axiosApiCall(url, method, body = {}) {
    return axios({
      method,
      url: `${ENDPOINT}${url}`,
      data: body,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  },
  async signUpWithEmailAndPassword(name, email, password, cb) {
    const user = await apiAuth
      .axiosApiCall("signUp", "post", {
        name,
        email,
        password,
      })
      .then((res) => res.data.user)
      .catch((err) => {
        throw new Error("An error occured while signing up");
      });

    cb(user);
  },
  // TODO: why doesn't it work to remove "const user = await" and directly call cb(res.data.user) in then()
  async signInWithEmailAndPassword(email, password, cb) {
    const user = await apiAuth
      .axiosApiCall("signInWithEmailAndPassword", "post", {
        email,
        password,
      })
      .then((res) => res.data.user)
      .catch((err) => {
        throw new Error(
          "Check your internet connection or email/password might be invalid"
        );
      });

    cb(user);
  },
  // Send the access_token to the backend, received by Google OAuth2 third party after clicking GoogleLogin button
  // The backend will check it and sign the user in by setting a jwt session token in an http only cookie and return the user
  async signInWithGoogle(access_token, cb) {
    const user = await apiAuth
      .axiosApiCall("signInWithGoogle", "post", {
        access_token,
      })
      .then((res) => res.data.user)
      .catch((err) => {
        throw new Error("An error occured while signing in with Google");
      });

    cb(user);
  },

  signOut(cb) {
    apiAuth
      .axiosApiCall("signOut", "post", {})
      .then(() => {
        cb();
      })
      .catch((err) => {
        throw new Error("An error occured while signing out");
      });
  },
  async resetPassword(email, cb) {
    return apiAuth
      .axiosApiCall("resetPassword", "post", {
        email,
      })
      .then(() => {
        cb();
      })
      .catch((err) => {
        throw new Error(
          "An error occured while sending a reset password email"
        );
      });
  },
  async getUser(cb) {
    await apiAuth
      .axiosApiCall("user", "get")
      .then((res) => {
        cb(res.data);
      })
      .catch((err) => {
        throw new Error("An error occured while getting user");
      });
  },
};

export default apiAuth;
