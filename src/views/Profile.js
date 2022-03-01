import { useTheme } from "@emotion/react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updateUserById } from "../api/functions";
import GlobalLayout from "../components/layout/GlobalLayout";
import { useAuth } from "../hooks/useAuth";

//TODO: use yup for validation
function Profile() {
  const auth = useAuth();

  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onRefreshClick = async () => {
    window.location.reload(false);
  };

  const handleSaveClick = async (data) => {
    setIsLoading(true);

    //TODO use auth
    try {
      const res = await updateUserById({
        id: auth.user.id,
        email: data.email,
        name: data.name,
      });

      setIsLoading(false);
      alert(res.message);
      reset(data);
    } catch (err) {
      reset();
      setIsLoading(false);

      alert(err);
    }
  };

  return (
    <GlobalLayout>
      <Typography variant="h1">Profile</Typography>

      <form onSubmit={handleSubmit(handleSaveClick)}>
        <Card variant="outlined">
          <CardContent>
            <TextField
              fullWidth
              placeholder="Name"
              {...register("name")}
              required
              sx={{ mb: 1 }}
              defaultValue={auth.user?.name}
            />
            <TextField
              fullWidth
              placeholder="Email"
              {...register("email")}
              required
              sx={{ mb: 1 }}
              defaultValue={auth.user.email}
            />
            {auth.user.isAdmin ? (
              <Tooltip title="Admin">
                <IconButton>
                  <AdminPanelSettingsIcon
                    sx={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Box />
            )}
            {!auth.user.isPremium ? (
              <Button href="/get-licence" variant="contained" sx={{ m: 1 }}>
                Get Premium Account to access bots !
              </Button>
            ) : (
              <Box />
            )}
          </CardContent>
          <CardActions>
            <LoadingButton
              variant="contained"
              loading={isLoading}
              onClick={onRefreshClick}
              sx={{
                m: 1,
              }}
            >
              Refresh
            </LoadingButton>

            <LoadingButton
              type="submit"
              variant="contained"
              disabled={!isDirty}
              loading={isLoading}
              sx={{
                m: 1,
              }}
            >
              Save
            </LoadingButton>
          </CardActions>
        </Card>
      </form>
    </GlobalLayout>
  );
}

export default Profile;
