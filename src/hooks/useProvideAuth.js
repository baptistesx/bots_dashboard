import { useEffect, useState } from "react";
import apiAuth from "../api/auth";
import useSnackbars from "../hooks/useSnackbars";

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const { addAlert } = useSnackbars();

  useEffect(() => {
    apiAuth
      .getUser((user) => {
        setUser(user);
      })
      .catch((err) => {
        addAlert({
          message: err.message,
          severity: "error",
        });
      });
  }, []);

  const signUpWithEmailAndPassword = (name, email, password, cb) =>
    apiAuth.signUpWithEmailAndPassword(name, email, password, (user) => {
      setUser(user);

      cb();
    });

  const signInWithEmailAndPassword = (email, password, cb) =>
    apiAuth.signInWithEmailAndPassword(email, password, (user) => {
      setUser(user);

      cb();
    });

  const signInWithGoogle = (access_token, cb) =>
    apiAuth.signInWithGoogle(access_token, (user) => {
      setUser(user);

      cb();
    });

  const signOut = () => apiAuth.signOut(() => setUser(null));

  const resetPassword = (email, cb) => apiAuth.resetPassword(email, () => cb());

  return {
    user,
    signUpWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signOut,
    resetPassword,
  };
}
