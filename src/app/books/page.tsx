'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getAxiosInstance } from '~/lib/axios'
import {AuthError} from "~/lib/custom_errors";
import {BookData} from "~/lib/data-types";

export default function Books(props: any) {
    const router = useRouter()
    const [books, setBooks] = useState<BookData[]>([])

    useEffect(() => {
        const getData = async () => {
            try {
                const axios = getAxiosInstance(true);
                axios.get("/book").then((res) => {
                    const books: BookData[] = res.data.data as BookData[];
                    setBooks(books);
                }).catch((err) => {
                    if(err.response.status === 401) throw new AuthError("Unauthorized");
                });
            }catch (err) {
                if(err instanceof AuthError) {
                    router.push('/login')
                }
            }
        };
        getData();
    }, [])

    return (
        <ul>
            {books &&
                books.map((book: BookData) => {
                    return (
                        <li key={book.id}>
                            {book.id}.) {book.name}
                        </li>
                    )
                })}
        </ul>
    )
}
