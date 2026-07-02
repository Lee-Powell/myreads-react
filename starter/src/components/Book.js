const Book = ({ book, onUpdateShelf }) => {

    const image = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/128x193?text=No+Image';

    const author = book.authors ? book.authors.join(', ') : 'Unknown Author';

    return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{ width: 128, height: 193, backgroundImage: image ? `url(${image})` : "none" }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf || 'none'}
            onChange={(e) => onUpdateShelf(book, e.target.value)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      < div className="book-authors">{author}</div>
    </div>
  );
};  

export default Book;    