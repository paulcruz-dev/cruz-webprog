import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { DataGrid } from "@mui/x-data-grid";
import usersSeed from "../../data/users.json?raw";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNumber: "",
  email: "",
  role: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : "";

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? "").trim(),
        lastName: String(user.lastName ?? "").trim(),
        age: String(user.age ?? "").trim(),
        gender: genders.includes(String(user.gender ?? "").trim().toLowerCase())
          ? String(user.gender ?? "").trim().toLowerCase()
          : "",
        contactNumber: String(user.contactNumber ?? "").trim(),
        email: String(user.email ?? "").trim().toLowerCase(),
        role: roles.includes(String(user.role ?? "").trim().toLowerCase())
          ? String(user.role ?? "").trim().toLowerCase()
          : "editor",
        username: String(user.username ?? "").trim().toLowerCase(),
        password: String(user.password ?? ""),
        address: String(user.address ?? "").trim(),
        isActive: typeof user.isActive === "boolean" ? user.isActive : true,
      })),
      error: "",
    };
  } catch {
    return { users: [], error: "Unable to read users data." };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // ✅ NEW: search + filters
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    role: "",
    gender: "",
    status: "",
  });

  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user?.id ?? null });
    setForm(user ? { ...blankForm, ...user } : { ...blankForm });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ✅ VALIDATION (UPDATED)
  const validate = () => {
    const nextErrors = {};

    const email = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNumber", "Contact number"],
      ["email", "Email"],
      ["role", "Role"],
      ["username", "Username"],
      ["password", "Password"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (!String(form[key]).trim()) {
        nextErrors[key] = `${label} is required.`;
      }
    });

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Invalid email format.";
    }

    if (
      !nextErrors.email &&
      users.some((u) => u.id !== modal.id && u.email === email)
    ) {
      nextErrors.email = "Email already exists.";
    }

    if (
      !nextErrors.username &&
      users.some((u) => u.id !== modal.id && u.username === username)
    ) {
      nextErrors.username = "Username already exists.";
    }

    // ✅ NEW RULES
    if (!/^\d+$/.test(form.age)) {
      nextErrors.age = "Age must be numbers only.";
    }

    if (!/^\d{11}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = "Contact must be 11 digits.";
    }

    if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (/\s/.test(form.username)) {
      nextErrors.username = "Username must not contain spaces.";
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const nextUser = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender,
      contactNumber: form.contactNumber.trim(),
      email: form.email.trim().toLowerCase(),
      role: form.role,
      username: form.username.trim().toLowerCase(),
      password: form.password,
      address: form.address.trim(),
      isActive: form.isActive,
    };

    setUsers((prev) =>
      modal.id
        ? prev.map((u) => (u.id === modal.id ? { ...u, ...nextUser } : u))
        : [
            ...prev,
            {
              id:
                prev.reduce(
                  (max, u) => Math.max(max, Number(u.id) || 0),
                  0
                ) + 1,
              ...nextUser,
            },
          ]
    );

    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, isActive: !u.isActive } : u
      )
    );
  };

  // ✅ FILTER + SEARCH LOGIC
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      `${u.firstName} ${u.lastName} ${u.email} ${u.username}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole = !filters.role || u.role === filters.role;
    const matchesGender = !filters.gender || u.gender === filters.gender;

    const matchesStatus =
      !filters.status ||
      (filters.status === "active" && u.isActive) ||
      (filters.status === "inactive" && !u.isActive);

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (_, r) => `${r.firstName} ${r.lastName}`,
    },
    { field: "username", headerName: "Username", width: 140 },
    { field: "age", headerName: "Age", width: 90 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: ({ row }) => (
        <Chip
          label={row.isActive ? "Active" : "Inactive"}
          color={row.isActive ? "success" : "default"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            color={row.isActive ? "warning" : "success"}
            onClick={() => toggleStatus(row.id)}
          >
            Toggle
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography variant="h4">Users</Typography>

        {/* SEARCH */}
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        {/* FILTERS */}
        <TextField
          select
          label="Role"
          value={filters.role}
          onChange={(e) =>
            setFilters((p) => ({ ...p, role: e.target.value }))
          }
        >
          <MenuItem value="">All</MenuItem>
          {roles.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Gender"
          value={filters.gender}
          onChange={(e) =>
            setFilters((p) => ({ ...p, gender: e.target.value }))
          }
        >
          <MenuItem value="">All</MenuItem>
          {genders.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(e) =>
            setFilters((p) => ({ ...p, status: e.target.value }))
          }
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>

        <Button variant="contained" onClick={() => openModal()}>
          Add User
        </Button>
      </Stack>

      {/* TABLE */}
      <Paper>
        <Box sx={{ height: 520 }}>
          <DataGrid rows={filteredUsers} columns={columns} />
        </Box>
      </Paper>

      {/* MODAL */}
      <Dialog open={modal.open} onClose={closeModal} fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {modal.id ? "Edit User" : "Add User"}
          </DialogTitle>

          <DialogContent>
            <Stack spacing={2}>
              <TextField {...fieldProps("firstName", "First Name")} />
              <TextField {...fieldProps("lastName", "Last Name")} />
              <TextField {...fieldProps("age", "Age")} />
              <TextField {...fieldProps("email", "Email")} />
              <TextField {...fieldProps("username", "Username")} />
              <TextField {...fieldProps("password", "Password")} />
              <TextField {...fieldProps("contactNumber", "Contact")} />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default UsersPage;