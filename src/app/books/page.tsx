'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from '~/lib/axios'

export default function Books(props: any) {
  const router = useRouter()
  const [books, setBooks] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const localUser = localStorage.getItem('auth')
        let auth

        if (localUser) {
          auth = JSON.parse(localUser)
        }

        if (!auth?.token) router.push('/login')

        const res = await axios.get('/book', {
          headers: {
            Authorization: 'Bearer ' + auth?.token,
          },
        })
        setBooks(res.data.data)
      } catch (err: any) {
        console.log(err)
        if (err.response.status === 401) router.push('/login')
      }
    }
    getData()
  }, [])

  return (
    <ul>
      {books &&
        books.map((book: any) => {
          return (
            <li key={book.id}>
              {book.id}.) {book.name}
            </li>
          )
        })}
    </ul>
  )
}
