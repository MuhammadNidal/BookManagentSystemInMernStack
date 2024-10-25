import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const DeleteBook = () => {
  const [book, setBook] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error(error);
        enqueueSnackbar("Error fetching book details", { variant: "error" });
      }
    };
    fetchBook();
  }, [id, enqueueSnackbar]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Error deleting book", { variant: "error" });
      console.error(error);
    }
    setOpen(false); // Close the dialog after deletion
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <BackButton />
      <Typography variant="h4" component="h1" sx={{ my: 2 }}>
        Delete Book
      </Typography>
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="body1">Are you sure you want to delete this book?</Typography>
        <Typography variant="h6">Title: {book.title}</Typography>
        <Typography variant="body1">Author: {book.author}</Typography>
        <Typography variant="body1">Publish Year: {book.publishYear}</Typography>
        <Button variant="contained" color="error" onClick={handleOpenDialog} sx={{ mt: 2 }}>
          Delete
        </Button>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this book?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteBook;
