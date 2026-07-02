import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

const SearchBooks = ({ books, onUpdateBook }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const results = await BooksAPI.search(query);
        if (Array.isArray(results)) {
          // Map the search results to include the shelf information from the main book list
          const updatedResults = results.map((result) => {
            const bookInShelf = books.find((book) => book.id === result.id);
            return bookInShelf ? { ...result, shelf: bookInShelf.shelf } : { ...result, shelf: "none" };
          });
          setSearchResults(updatedResults);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [query, books]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <Book book={book} onUpdateShelf={ onUpdateBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;