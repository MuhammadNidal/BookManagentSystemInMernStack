import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button, TextField, Typography, Paper, Box, IconButton } from "@mui/material";
import { MdDelete, MdOutlineEdit } from "react-icons/md"; // Import icons

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
      } catch (error) {
        console.error(error);
        enqueueSnackbar("Error fetching book details", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, enqueueSnackbar]);

  const handleEditBook = async () => {
    if (!title || !author || !publishYear) {
      enqueueSnackbar("All fields are required", { variant: "warning" });
      return;
    }

    const data = { title, author, publishYear };
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/books/${id}`, data);
      enqueueSnackbar("Book Edited Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Error editing book", { variant: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Error deleting book", { variant: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Book
      </Typography>
      {loading && <Spinner />}
      <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, mx: "auto" }}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Publish Year"
            variant="outlined"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditBook}
            >
              <MdOutlineEdit style={{ marginRight: 4 }} />
              Edit
            </Button>
            <IconButton
              color="error"
              onClick={handleDeleteBook}
              aria-label="delete"
            >
              <MdDelete />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default EditBook;
