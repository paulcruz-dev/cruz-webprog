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
import { fetchArticles, createArticle, updateArticle, deleteArticle } from "../../services/ArticleService";

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

const DashArticleListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    image: "",
    isPublished: true,
  });

  const loadArticles = async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewArticle({
      title: "",
      content: "",
      author: "",
      category: "",
      image: "",
      isPublished: true,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = (id) => {
    const articleToEdit = articles.find((a) => a._id === id);
    if (articleToEdit) {
      setNewArticle({ ...articleToEdit });
      setEditArticleId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveArticle = async () => {
    try {
      if (isEditing) {
        await updateArticle(editArticleId, newArticle);
      } else {
        await createArticle(newArticle);
      }
      loadArticles();
      handleClose();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id);
        loadArticles();
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  const handleTogglePublish = async (id, isPublished) => {
    try {
      await updateArticle(id, { isPublished: !isPublished });
      loadArticles();
    } catch (error) {
      console.error("Error toggling article:", error);
    }
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "author", headerName: "Author", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "isPublished",
      headerName: "Published",
      flex: 1,
      renderCell: (params) => (
        <Switch
          checked={params.row.isPublished}
          onChange={() => handleTogglePublish(params.row._id, params.row.isPublished)}
        />
      ),
    },
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
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Stack direction="row" sx={{ mb: 5, justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          Articles Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Add Article
        </Button>
      </Stack>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            {isEditing ? "Edit Article" : "Add Article"}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={2}>
            <TextField
              label="Title"
              size="small"
              fullWidth
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Author"
                size="small"
                fullWidth
                value={newArticle.author}
                onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
              />
              <TextField
                label="Category"
                size="small"
                fullWidth
                value={newArticle.category}
                onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
              />
            </Stack>
            <TextField
              label="Image URL"
              size="small"
              fullWidth
              value={newArticle.image}
              onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
            />
            <TextField
              label="Content"
              size="small"
              fullWidth
              multiline
              rows={4}
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={newArticle.isPublished}
                  onChange={(e) => setNewArticle({ ...newArticle, isPublished: e.target.checked })}
                  color="primary"
                />
              }
              label={`Status: ${newArticle.isPublished ? "Published" : "Draft"}`}
            />
          </Stack>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveArticle}>
              Save Article
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Box sx={{ height: 500 }}>
        <DataGrid
          rows={articles}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
        />
      </Box>
    </>
  );
};

export default DashArticleListPage;