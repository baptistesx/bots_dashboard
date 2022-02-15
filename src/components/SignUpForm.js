import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth, useFirestore } from "reactfire";
import * as yup from "yup";
import { registerWithEmailAndPassword } from "../firebase";

//TODO: validate and update error message in direct live
//TODO: check if passwordConfirmation === password
const schema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: yup.string().min(6).max(255).required("Password is required"),
    passwordConfirmation: yup
      .string()
      .min(6)
      .max(255)
      .required("Password confirmation is required"),
  })
  .required();

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const auth = useAuth();
  const db = useFirestore();

  const [isSigningUp, setIsSigningUp] = useState(false);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSigningUp(true);

    const res = await registerWithEmailAndPassword({
      auth,
      db,
      email,
      password,
    });
    setIsSigningUp(false);

    welcomeAndRedirectUser(res);
  };

  const welcomeAndRedirectUser = (res) => {
    //TODO: replace alert with snackbar
    if (res.error) {
      console.error(res.message);
      alert(res.message);
    } else {
      if (res.isNewUser) {
        alert("Welcome newbie!");
      } else if (!res.isNewUser) {
        alert("Welcome back!");
      }

      history.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Email"
            {...register("email")}
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <p>{errors.email?.message}</p>

          <TextField
            fullWidth
            type={"password"}
            placeholder="Password"
            {...register("password")}
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <p>{errors.password?.message}</p>

          <TextField
            fullWidth
            type={"password"}
            placeholder="Confirm password"
            {...register("passwordConfirmation")}
            required
            onChange={(event) => {
              setPasswordConfirmation(event.target.value);
            }}
          />
          <p>{errors.passwordConfirmation?.message}</p>
        </CardContent>
        <CardActions>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSigningUp}
            sx={{
              m: 1,
            }}
          >
            Sign up
          </LoadingButton>

          <Button
            sx={{
              m: 1,
            }}
            href="/signin"
          >
            I already have an account (or Google account)
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default SignUpForm;
