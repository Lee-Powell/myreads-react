import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchBooks from "./components/SearchBooks";
import BookShelf from "./components/BookShelf";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await BooksAPI.getAll();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleUpdateShelf = async (book, newShelf) => {
    try {
      await BooksAPI.update(book, newShelf);
      // Update the local state to reflect the change
      setBooks((prevBooks) => {
        // Check if the book is already in the list
        const existingBookIndex = prevBooks.findIndex((b) => b.id === book.id);
        if (existingBookIndex !== -1) {
          // Update the shelf of the existing book
          const updatedBooks = [...prevBooks];
          updatedBooks[existingBookIndex].shelf = newShelf;
          return updatedBooks;
        } else {
          //  If the book is not in the list, add it with the new shelf
          return [...prevBooks, { ...book, shelf: newShelf }];
        }
      });
    } catch (error) {
      console.error("Error updating book shelf:", error);
    }
  };
  

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelf
                  title="Currently Reading"
                  books={books.filter((book) => book.shelf === "currentlyReading")}
                  onUpdateShelf={handleUpdateShelf}
                />
                <BookShelf
                  title="Want to Read"
                  books={books.filter((book) => book.shelf === "wantToRead")}
                  onUpdateShelf={handleUpdateShelf}
                />
                <BookShelf
                  title="Read"
                  books={books.filter((book) => book.shelf === "read")}
                  onUpdateShelf={handleUpdateShelf}
                />
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div> 
          }
        />
        <Route
          path="/search"
          element={<SearchBooks books={books} onUpdateBook={handleUpdateShelf} />}
        />
      </Routes>
    </div>
  );    

}

export default App;
