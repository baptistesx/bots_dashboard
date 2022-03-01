import api from "./api";

const apiAuth = {
  async signUpWithEmailAndPassword(name, email, password, cb) {
    const user = await api
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
    const user = await api
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
    const user = await api
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
    api
      .axiosApiCall("signOut", "post", {})
      .then(() => {
        cb();
      })
      .catch((err) => {
        throw new Error("An error occured while signing out");
      });
  },
  async resetPassword(email, cb) {
    return api
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
    await api
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
