import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom with an alias
import { MdOutlineAddBox } from "react-icons/md";
import { MdTableRows, MdGridView } from "react-icons/md"; // Import Material Icons for table and grid view
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { useSnackbar } from "notistack";
import Spinner from "../components/Spinner";
import { Button, Typography, Grid, Paper, IconButton, Tooltip } from "@mui/material";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/books");
        setBooks(response.data.data);
      } catch (error) {
        console.error(error);
        enqueueSnackbar("Error fetching books", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [enqueueSnackbar]);

  return (
    <div className="p-4">
      <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setShowType("table")} 
              sx={{ mr: 1 }}
              startIcon={<MdTableRows />} // Adding table icon
            >
              Table View
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => setShowType("card")} 
              startIcon={<MdGridView />} // Adding card icon
            >
              Card View
            </Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
          <Typography variant="h4" component="h1" sx={{ my: 2 }}>
            Books Managment System In Mern  Stack
          </Typography>
          <Tooltip title="Create a new book" arrow>
            <IconButton 
              component={RouterLink} 
              to="/books/create" 
              color="primary" 
              sx={{ padding: 1, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' }, borderRadius: '50%' }} // Adding hover effect and rounded button
            >
              <MdOutlineAddBox className="text-sky-800 text-4xl" />
            </IconButton>
          </Tooltip>
        </Grid>
        {loading ? (
          <Spinner />
        ) : (
          showType === "table" ? <BooksTable books={books} /> : <BooksCard books={books} />
        )}
      </Paper>
    </div>
  );
};

export default Home;
