import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteBook, fetchBook } from "@/lib/api";
import Link from "next/link";

export default function BookDetail() {
    const [book, setBook] = useState({ title: '', author: '', description: '', price: 0, salesCount: 0, stockQuantity: 0});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetchBook(id as string).then(setBook);
        }
    }, [id]);

    const handleDelete = async() => {
        if (confirm('Are you sure you want to delete this book?')) {
            await deleteBook(id as string);
            router.push(`/`);
        }
    };

    if (!book) return <div>Loading ...</div>;

    return (
        <div>
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <p>Sales Count: {book.salesCount}</p>
            <p>Stock Quantity: {book.stockQuantity}</p>
            <p>Description: {book.description}</p>
            <Link href={`/books/edit/${id}`}>
                <button>Edit</button>
            </Link>
            <button onClick={handleDelete}>Delete</button>
            <Link href="/">
                Back to list
            </Link>
        </div>
    );
}