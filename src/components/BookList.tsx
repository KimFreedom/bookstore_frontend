import BookItem from "./BookItem";

interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    salesCount: number;
    stockQuantity: number;
}

interface BookListProps {
    books: Book[] | undefined;
}

const BookList: React.FC<BookListProps> = ({ books }) => {
    if (!books || books.length === 0) {
        return <div>No books available.</div>;
    }
    
    return (
        <div>
            {books.map((book) => (
                <BookItem key={book._id} book={book}/>
            ))}
        </div>
    );
};

export default BookList;