import Link from "next/link";

interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    salesCount: number;
    stockQuantity: number;
}

interface BookItemProps {
    book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
    return (
        <div>
            <h3>
                <Link href={`/books/${book._id}`}>
                    {book.title}
                </Link>
            </h3>
            <p>Author: {book.author}</p>
            <p>Description: {book.description}</p>
            <p>Price: {book.price}</p>
            <p>Sales Count: {book.salesCount}</p>
            <p>Stock Quantity: {book.stockQuantity}</p>
        </div>
    );
};

export default BookItem;