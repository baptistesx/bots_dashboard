import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Card, CardActions, CardContent, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import resetPasswordFormSchema from "../../schemas/resetPasswordFormSchema";

const ResetPasswordForm = () => {
  let auth = useAuth();

  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordFormSchema),
  });

  //TODO: use snackbar
  const onSubmit = async (data) => {
    setIsLoading(true);

    auth
      .resetPassword(email, () => {
        setIsLoading(false);

        alert("If email is valid, a reset password email has been sent");
      })
      .catch((err) => {
        setIsLoading(false);

        alert(err);
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
        </CardContent>

        <CardActions>
          <LoadingButton
            sx={{
              m: 1,
            }}
            type="submit"
            variant="contained"
            loading={isLoading}
          >
            Reset password
          </LoadingButton>
        </CardActions>
      </Card>
    </form>
  );
};

export default ResetPasswordForm;
