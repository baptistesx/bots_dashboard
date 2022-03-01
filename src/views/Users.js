import AddModeratorIcon from "@mui/icons-material/AddModerator";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import apiUsers from "../api/users";
import GlobalLayout from "../components/layout/GlobalLayout";
import EditUserDialog from "../components/users/EditUserDialog";
import { useAuth } from "../hooks/useAuth";
import useSnackbars from "../hooks/useSnackbars";

function Users() {
  const auth = useAuth();
  const currentUser = auth.user;

  const { addAlert } = useSnackbars();

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);

  const [userSelected, setUserSelected] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const onRefreshClick = () => {
    fetchData();
  };

  const fetchData = () => {
    setIsLoading(true);

    apiUsers.getUsers((users) => setUsers([...users]));

    setIsLoading(false);
  };

  const onDeleteClick = async (userId) => {
    setIsLoading(true);

    apiUsers.deleteUserById(userId, () => {
      fetchData();

      setIsLoading(false);

      addAlert({
        message: "User well deleted",
        severity: "success",
      });
    });
  };

  const onToggleAdminRights = async (userId) => {
    setIsLoading(true);

    apiUsers.toggleAdminRights(userId, () => {
      fetchData();

      setIsLoading(false);

      addAlert({
        message: "User well updated",
        severity: "success",
      });
    });
  };

  const handleOpenUserDialog = (user) => {
    setUserSelected(user ?? {});

    setIsEditUserDialogOpen(true);
  };

  const handleCloseCitiesDialog = async (res) => {
    setIsEditUserDialogOpen(false);
    setUserSelected(null);

    if (res?.modified) {
      fetchData();
    }
  };

  return (
    <GlobalLayout>
      <Typography variant="h1">Users</Typography>

      <Card>
        <CardContent>
          {users.length === 0 && isLoading ? (
            <Box />
          ) : (
            <Box>
              <Typography variant="body1">
                {`${users.length} Available users`}
              </Typography>

              {users.length === 0 ? (
                <Typography>No users</Typography>
              ) : (
                <TableContainer component={Paper}>
                  <Table aria-label="users table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Admin</TableCell>
                        <TableCell align="left">Premium</TableCell>
                        <TableCell align="left">Email verified</TableCell>
                        <TableCell align="left">Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell component="th" scope="row">
                            {user.name}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {user.email}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            {user.isAdmin ? <CheckIcon /> : <ClearIcon />}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            {user.isPremium ? <CheckIcon /> : <ClearIcon />}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            {user.is_email_verified ? (
                              <CheckIcon />
                            ) : (
                              <ClearIcon />
                            )}
                          </TableCell>
                          <TableCell align="left">
                            <Tooltip title="Toggle admin rights">
                              <IconButton
                                aria-label="toggle-admin-rights"
                                onClick={() => onToggleAdminRights(user.id)}
                                disabled={
                                  user.email === currentUser.email || isLoading
                                }
                              >
                                {user.isAdmin ? (
                                  <RemoveModeratorIcon />
                                ) : (
                                  <AddModeratorIcon />
                                )}
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Edit user">
                              <IconButton
                                onClick={() => handleOpenUserDialog(user)}
                                disabled={isLoading}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Delete user">
                              <IconButton
                                aria-label="delete"
                                onClick={() => onDeleteClick(user.id)}
                                disabled={
                                  user.email === currentUser.email || isLoading
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}
        </CardContent>

        <CardActions>
          <Button onClick={() => handleOpenUserDialog()}>Create a user</Button>

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
        </CardActions>
      </Card>

      {userSelected ? (
        <EditUserDialog
          keepMounted
          open={isEditUserDialogOpen}
          onClose={handleCloseCitiesDialog}
          user={userSelected}
        />
      ) : (
        <Box></Box>
      )}
    </GlobalLayout>
  );
}

export default Users;
