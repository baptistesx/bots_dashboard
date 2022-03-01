import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import signUpFormSchema from "../../schemas/signUpFormSchema";

//TODO: validate and update fields error messages in direct live
//TODO: check if possible to validate form when browser autofill fields
//TODO: update fields errors message style
//TODO: on google signin, ask to choose an account and don't directly connect to the last used (remove token?)
//TODO: apply previous changes also to SignInForm

const SignUpForm = () => {
  let auth = useAuth();

  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [isSigningUp, setIsSigningUp] = useState(false);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const onSubmit = (data) => {
    setIsSigningUp(true);

    auth
      .signUpWithEmailAndPassword(name, email, password, () => {
        setIsSigningUp(false);

        history.replace(from);
      })
      .catch((err) => {
        setIsSigningUp(false);

        alert(err);
      });
  };

  const onGetOauthGoogleTokenSuccess = async (response) => {
    setIsSigningUp(true);

    auth
      .signInWithGoogle(response.accessToken, () => {
        setIsSigningUp(false);

        history.replace(from);
      })
      .catch((err) => {
        setIsSigningUp(false);

        alert(err);
      });
  };

  const onGetOauthGoogleTokenFail = async (error) => {
    //TODO: replace alert with snackbar
    alert(error);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Name"
            {...register("name")}
            required
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <p>{errors.name?.message}</p>

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
          {/* //TODO: style error messages */}
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
              I already have an account
            </Button>
          </CardActions>

          <Divider>or</Divider>

          <CardActions
            sx={{ display: "flex", justifyContent: "center", mt: 2 }}
          >
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Sign up with Google"
              onSuccess={onGetOauthGoogleTokenSuccess}
              onFailure={onGetOauthGoogleTokenFail}
            />
          </CardActions>
        </CardContent>
      </Card>
    </form>
  );
};

export default SignUpForm;
