import { fetchBook, updateBook } from "@/lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditBook() {
    const [book, setBook] = useState({ title: '', author: '', description: '', price: 0, salesCount: 0, stockQuantity: 0});
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetchBook(id as string).then(setBook);
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBook(id as string, book);
        router.push(`/books/${id}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Book</h1>
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
            <button type="submit">Update Book</button>
        </form>
    );
}