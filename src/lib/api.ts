import axios from 'axios';
import { z } from 'zod';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api`;
//const API_URL = 'http://localhost:3000/api';

const BookSchema = z.object({
    _id: z.string(),
    title: z.string(),
    author: z.string(),
    description: z.string(),
    price: z.number(),
    salesCount: z.number(),
    stockQuantity: z.number(),
});

const BookDataSchema = z.object({
    books: z.array(BookSchema),
    totalPages: z.number(),
});

export const fetchBooks = async (page = 1, limit = 10, search = '') => {
    try {
        console.log(`[api] fetchBooks try to GET ${API_URL}/books`);
        const response = await axios.get(`${API_URL}/books`, {
            params: { page, limit, search },
        });

        const validatedData = BookDataSchema.parse(response.data);
        return validatedData;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Invalid data structure:', error.errors);
        } else {
            console.error('Error fetching books:', error);
        }
        throw error;
    }
};

export const fetchBook = async (id: string) => {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
};

export const createBook = async (bookData: any) => {
    const response = await axios.post(`${API_URL}/books`, bookData);
    return response.data;
};

export const updateBook = async (id: string, bookData: any) => {
    const response = await axios.put(`${API_URL}/books/${id}`, bookData);
    return response.data;
};

export const deleteBook = async (id: string) => {
    const response = await axios.delete(`${API_URL}/books/${id}`);
    return response.data;
};