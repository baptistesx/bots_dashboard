import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import useSnackbars from "../../hooks/useSnackbars";
import signInFormSchema from "../../schemas/signInFormSchema";

function SignInForm() {
  let auth = useAuth();

  const { addAlert } = useSnackbars();

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSigningIn, setIsSigningIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const onSubmit = (data) => {
    setIsSigningIn(true);

    auth
      .signInWithEmailAndPassword(email, password, () => {
        setIsSigningIn(false);

        // On success, auth.user will not be null anymore => NotSignedInRoute will redirect to /dashboard

        addAlert({
          message: "Welcome", // TODO: use custom message if new user
          severity: "success",
        });
      })
      .catch((err) => {
        setIsSigningIn(false);

        addAlert({
          message: err.message,
          severity: "error",
        });
      });
  };

  const onGetOauthGoogleTokenSuccess = (response) => {
    setIsSigningIn(true);

    auth
      .signInWithGoogle(response.accessToken, () => {
        setIsSigningIn(false);

        // On success, auth.user will not be null anymore => NotSignedInRoute will redirect to /dashboard
        addAlert({
          message: "Welcome", // TODO: use custom message if new user
          severity: "success",
        });
      })
      .catch((err) => {
        setIsSigningIn(false);

        addAlert({
          message: err.message,
          severity: "error",
        });
      });
  };

  const onGetOauthGoogleTokenFail = async (error) => {
    addAlert({
      message: error.message,
      severity: "error",
    });
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
          {/* //TODO: style error messages */}
          <p>{errors.password?.message}</p>
        </CardContent>

        <CardActions>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSigningIn}
            sx={{
              m: 1,
            }}
          >
            Sign In
          </LoadingButton>

          <Button
            sx={{
              m: 1,
            }}
            href="/reset-password"
          >
            I forgot my password
          </Button>
        </CardActions>

        <Divider>or</Divider>

        <CardActions sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={onGetOauthGoogleTokenSuccess}
            onFailure={onGetOauthGoogleTokenFail}
          />
        </CardActions>
      </Card>
    </form>
  );
}

export default SignInForm;
