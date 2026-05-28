import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Modal,
  TextField,
  MenuItem,
  Chip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const DashArticleListPage = () => {
  const [open, setOpen] = useState(false);

  const [articles, setArticles] = useState([
    {
      id: "A770DD",
      slug: "test",
      title: "test",
      paragraphs: 3,
      preview: "Sample preview article content...",
      status: "Active",
    },
  ]);

  const [newArticle, setNewArticle] = useState({
    slug: "",
    title: "",
    paragraphs: "",
    preview: "",
    status: "Active",
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleAddArticle = () => {
    const article = {
      id: Math.random().toString(36).substring(2, 8),
      ...newArticle,
    };

    setArticles([...articles, article]);

    setNewArticle({
      slug: "",
      title: "",
      paragraphs: "",
      preview: "",
      status: "Active",
    });

    handleClose();
  };

  const filteredArticles = articles.filter(
    (article) => {
      const matchesSearch =
        article.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        article.slug
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        article.status === statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 120,
    },

    {
      field: "slug",
      headerName: "Slug",
      flex: 1,
    },

    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },

    {
      field: "paragraphs",
      headerName: "Paragraphs",
      width: 130,
    },

    {
      field: "preview",
      headerName: "Preview",
      flex: 2,
    },

    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Active"
              ? "success"
              : "error"
          }
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: () => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            size="small"
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="warning"
            size="small"
          >
            Disable
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Articles
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Add Article
        </Button>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          fullWidth
          label="Search Articles"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <TextField
          select
          label="Status Filter"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          sx={{ width: 200 }}
        >
          <MenuItem value="All">
            All Statuses
          </MenuItem>

          <MenuItem value="Active">
            Active
          </MenuItem>

          <MenuItem value="Disabled">
            Disabled
          </MenuItem>
        </TextField>
      </Stack>

      <Box sx={{ height: 500 }}>
        <DataGrid
          rows={filteredArticles}
          columns={columns}
          pageSizeOptions={[5, 10]}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            Add Article
          </Typography>

          <Stack spacing={2} sx={{ mt: 3 }}>
            <TextField
              label="Slug"
              value={newArticle.slug}
              onChange={(e) =>
                setNewArticle({
                  ...newArticle,
                  slug: e.target.value,
                })
              }
            />

            <TextField
              label="Title"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle({
                  ...newArticle,
                  title: e.target.value,
                })
              }
            />

            <TextField
              label="Paragraph Count"
              value={newArticle.paragraphs}
              onChange={(e) =>
                setNewArticle({
                  ...newArticle,
                  paragraphs: e.target.value,
                })
              }
            />

            <TextField
              multiline
              rows={4}
              label="Preview"
              value={newArticle.preview}
              onChange={(e) =>
                setNewArticle({
                  ...newArticle,
                  preview: e.target.value,
                })
              }
            />

            <Stack
              direction="row"
              spacing={2}
            >
              <Button onClick={handleClose}>
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={handleAddArticle}
              >
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default DashArticleListPage;