import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";

const ShowBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar(error.response?.data.message || "Error fetching books", { variant: "error" });
        console.log(error);
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Books Managment System In Mern Stack</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full p-4 mx-auto shadow-lg">
        {books.length === 0 ? (
          <h2>No books found.</h2>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Author</th>
                <th className="border px-4 py-2">Publish Year</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td className="border px-4 py-2">{book.title}</td>
                  <td className="border px-4 py-2">{book.author}</td>
                  <td className="border px-4 py-2">{book.publishYear}</td>
                  <td className="border px-4 py-2">
                    <Link to={`/delete/${book._id}`} className="text-red-500 hover:text-red-700">
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ShowBooks;
