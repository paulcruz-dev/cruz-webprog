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
  FormControlLabel,
  Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { fetchUsers, createUser, updateUser } from "../../services/UserService";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
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
      renderCell: (params) =>
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
          {/* Modal Title */}
          <Typography variant="h6" fontWeight="bold" mb={2}>
            {isEditing ? "Edit User" : "Add User"}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              label="First Name"
              size="small"
              fullWidth
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            />
            <TextField
              label="Last Name"
              size="small"
              fullWidth
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            />
          </Stack>

          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              label="Age"
              size="small"
              fullWidth
              value={newUser.age}
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
            />
            <FormControl size="small" fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={newUser.gender}
                label="Gender"
                onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={2} mb={2}>
            <TextField
              label="Contact Number"
              size="small"
              fullWidth
              value={newUser.contactNumber}
              onChange={(e) => setNewUser({ ...newUser, contactNumber: e.target.value })}
            />
            <TextField
              label="Email Address"
              size="small"
              fullWidth
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </Stack>

          {/* Row 4: Role + Username */}
          <Stack direction="row" spacing={2} mb={2}>
            <FormControl size="small" fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={newUser.type}
                label="Role"
                onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Username"
              size="small"
              fullWidth
              autoComplete="off"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
          </Stack>

          {/* Row 5: Password */}
          <TextField
            label="Password"
            type="password"
            size="small"
            fullWidth
            autoComplete="new-password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            sx={{ mb: 2 }}
          />

          {/* Row 6: Address */}
          <TextField
            label="Address"
            size="small"
            fullWidth
            value={newUser.address}
            onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            sx={{ mb: 2 }}
          />

          {/* User Status Toggle */}
          <FormControlLabel
            control={
              <Switch
                checked={newUser.isActive}
                onChange={(e) => setNewUser({ ...newUser, isActive: e.target.checked })}
                color="primary"
              />
            }
            label={`User status: ${newUser.isActive ? "Active" : "Inactive"}`}
            sx={{ mb: 2 }}
          />

          <Divider sx={{ mb: 2 }} />

          {/* Action Buttons */}
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveUser}>
              {isEditing ? "Save User" : "Save User"}
            </Button>
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