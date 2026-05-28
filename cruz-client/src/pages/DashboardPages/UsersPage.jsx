import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ⚠️ Make sure these are correctly imported from your service
import { fetchUsers, createUser, updateUser } from "../../services/UserService";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 760,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    username: "",
    password: "",
    address: "",
    type: "editor",
    isActive: true,
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewUser({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      contactNumber: "",
      email: "",
      username: "",
      password: "",
      address: "",
      type: "editor",
      isActive: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);
    if (userToEdit) {
      setNewUser({ ...userToEdit, password: "" });
      setEditUserId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveUser = async () => {
    try {
      if (isEditing) {
        const updatedUser = { ...newUser };
        if (!updatedUser.password) delete updatedUser.password;
        await updateUser(editUserId, updatedUser);
      } else {
        await createUser(newUser);
      }
      loadUsers();
      handleClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });
      loadUsers();
    } catch (error) {
      console.error("Error toggling user:", error);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "age", headerName: "Age", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "contactNumber", headerName: "Contact #", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleEdit(params.row._id)}
          >
            Edit
          </Button>
          <Switch
            checked={params.row.isActive}
            onChange={() =>
              handleToggleActive(params.row._id, params.row.isActive)
            }
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Stack direction="row" sx={{ mb: 5, justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          Users Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Add User
        </Button>
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h5">
            {isEditing ? "Edit User" : "Add User"}
          </Typography>

          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="First Name"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
            />

            <TextField
              label="Last Name"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
            />

            <TextField
              label="Age"
              value={newUser.age}
              onChange={(e) =>
                setNewUser({ ...newUser, age: e.target.value })
              }
            />

            <FormControl>
              <InputLabel>Gender</InputLabel>
              <Select
                value={newUser.gender}
                onChange={(e) =>
                  setNewUser({ ...newUser, gender: e.target.value })
                }
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <TextField
              label="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />

            <TextField
              label="Password"
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />

            <Stack direction="row" spacing={2}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={handleSaveUser}>
                {isEditing ? "Save" : "Add"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>

      <Box sx={{ height: 500 }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
        />
      </Box>
    </>
  );
};

export default UsersPage;