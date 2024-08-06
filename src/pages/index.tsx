import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchBooks } from "../lib/api";
import SearchForm from "@/components/SearchForm";
import BookList from "@/components/BookList";
import Pagination from "@/components/Pagination";
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

export default function Home() {
    const [books, setBooks] = useState<Book[] | undefined>(undefined);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { page = '1', search = '' } = router.query;

    useEffect(() => {
        const loadBooks = async () => {
            setIsLoading(true);
            try {
                const data = await fetchBooks(Number(page), 10, search as string);
                setBooks(data.books);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching books:', error);
                setBooks([]);
            } finally {
                setIsLoading(false);
            }
        };
        loadBooks();
    }, [page, search]);

    const handleSearch = (searchTerm: string) => {
        router.push(`/?page=1&search=${searchTerm}`);
    };

    return (
        <div>
            <h1>Book List</h1>
            <SearchForm onSearch={handleSearch} />
            <Link href="/books/add">
                <button>Add New Book</button>
            </Link>
            <BookList books={books} isLoading={isLoading} />
            <Pagination 
                currentPage={Number(page)}
                totalPages={totalPages}
                onPageChange={(newPage) => router.push(`/?page=${newPage}&search=&{search}`)}
            />
        </div>
    );
}