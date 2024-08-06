import { createBook } from "@/lib/api";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddBook() {
    const [book, setBook] = useState({ title: '', author: '', description: '', price: 0, salesCount: 0, stockQuantity: 0});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createBook(book);
        router.push(`/`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add New Book</h1>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={book.title} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="author">Author:</label>
                <input type="text" id="author" name="author" value={book.author} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" name="description" value={book.description} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" value={book.price} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="salesCount">Sales Count:</label>
                <input type="number" id="salesCount" name="salesCount" value={book.salesCount} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="stockQuantity">Stock Quantity:</label>
                <input type="number" id="stockQuantity" name="stockQuantity" value={book.stockQuantity} onChange={handleChange} required />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
}