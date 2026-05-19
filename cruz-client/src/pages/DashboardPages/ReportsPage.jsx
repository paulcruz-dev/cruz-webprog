import { useRef, useState, useMemo } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  {
    id: 1,
    firstName: "Jon",
    lastName: "Snow",
    age: 14,
    role: "Admin",
    gender: "Male",
    status: "active",
    email: "jon@mail.com",
    username: "jonsnow",
  },
  {
    id: 2,
    firstName: "Cersei",
    lastName: "Lannister",
    age: 31,
    role: "Manager",
    gender: "Female",
    status: "inactive",
    email: "cersei@mail.com",
    username: "cersei",
  },
  {
    id: 3,
    firstName: "Arya",
    lastName: "Stark",
    age: 18,
    role: "User",
    gender: "Female",
    status: "active",
    email: "arya@mail.com",
    username: "aryastark",
  },
];

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "firstName", headerName: "First name", width: 140 },
  { field: "lastName", headerName: "Last name", width: 140 },
  { field: "email", headerName: "Email", width: 220 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "role", headerName: "Role", width: 120 },
  { field: "gender", headerName: "Gender", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "age", headerName: "Age", width: 100, type: "number" },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 180,
    sortable: false,
    valueGetter: (_, params) => {
      const row = params?.row || {};
      return `${row.firstName || ""} ${row.lastName || ""}`;
    },
  },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        row.firstName.toLowerCase().includes(search.toLowerCase()) ||
        row.lastName.toLowerCase().includes(search.toLowerCase()) ||
        row.email.toLowerCase().includes(search.toLowerCase()) ||
        row.username.toLowerCase().includes(search.toLowerCase());

      return (
        matchesSearch &&
        (role ? row.role === role : true) &&
        (gender ? row.gender === gender : true) &&
        (status ? row.status === status : true)
      );
    });
  }, [search, role, gender, status]);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const win = window.open("", "_blank", "width=1200,height=900");
    if (!win) return;

    const date = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    win.document.write(`
      <html>
        <head>
          <title>Report</title>
          <style>
            body {
              font-family: Arial;
              padding: 24px;
              background: #ffffff;
            }
            h1 { margin-bottom: 6px; }
            .meta {
              color: gray;
              font-size: 12px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <h1>Reports Summary</h1>
          <div class="meta">Generated: ${date}</div>
          ${printContent.outerHTML}
        </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1300px",
        mx: "auto",
        px: { xs: 2, sm: 3, md: 4 },
        py: 4,
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", lg: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} sx={{ color: "#1e293b" }}>
            Reports Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Analytics dashboard with filtering, charts, and export tools.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button variant="contained" sx={{ borderRadius: 2, px: 3 }}>
            Generate
          </Button>
          <Button
            variant="outlined"
            onClick={handlePrint}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Export
          </Button>
        </Stack>
      </Stack>

      {/* FILTERS */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            useFlexGap
            flexWrap="wrap"
          >
            <TextField
              size="small"
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: 220 }}
            />

            <TextField
              select
              size="small"
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </TextField>

            <TextField
              select
              size="small"
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>

            <TextField
              select
              size="small"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      {/* CONTENT */}
      <Stack spacing={3} ref={printRef}>
        {/* BAR CHART */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Monthly Output
            </Typography>

            <BarChart
              height={320}
              series={[
                { data: [18, 24, 20, 27], label: "Generated" },
                { data: [12, 19, 17, 23], label: "Completed" },
              ]}
              xAxis={[{ data: ["Jan", "Feb", "Mar", "Apr"], scaleType: "band" }]}
            />
          </CardContent>
        </Card>

        {/* PIE + GAUGE */}
        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
          <Card sx={{ flex: 1, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Category Share
              </Typography>

              <Box display="flex" justifyContent="center">
                <PieChart
                  width={320}
                  height={240}
                  series={[
                    {
                      data: [
                        { id: 0, value: 14, label: "Sales" },
                        { id: 1, value: 10, label: "Users" },
                        { id: 2, value: 8, label: "Inventory" },
                        { id: 3, value: 6, label: "Finance" },
                      ],
                    },
                  ]}
                />
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Completion Rate
              </Typography>

              <Box display="flex" justifyContent="center" height={240}>
                <Gauge width={220} height={220} value={78} />
              </Box>
            </CardContent>
          </Card>
        </Stack>

        {/* TABLE */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight={600} mb={2}>
              User Reports
            </Typography>

            <Box sx={{ height: 420 }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                pageSizeOptions={[5]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                checkboxSelection
                disableRowSelectionOnClick
                sx={{
                  border: "none",
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;