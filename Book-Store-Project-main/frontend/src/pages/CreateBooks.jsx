import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async () => {
    // Validate input fields
    if (!title || !author || !publishYear) {
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }

    const data = { title, author, publishYear };
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/books", data);
      enqueueSnackbar("Book Created Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar(error.response?.data.message || "Error creating book", { variant: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <Typography variant="h4" component="h1" sx={{ my: 2 }}>
        Create Book
      </Typography>
      {loading && <Spinner />}
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, maxWidth: 600, mx: 'auto' }}>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Author"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Publish Year"
            variant="outlined"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveBook}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default CreateBooks;
