'use client'

import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import axios from '~/lib/axios'
import { AuthContext } from '~/layout'

export default function Books(props: any) {
  const router = useRouter()
  const { user, setUser } = useContext(AuthContext)
  const [books, setBooks] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('/api/book', {
          headers: {
            Authorization: 'Bearer ' + user?.token,
          },
        })

        setBooks(res.data.data)
      } catch (err: any) {
        if (err.response.status === 401) router.push('/login')
        console.log(err)
      }
    }
    if (user?.token) {
      getData()
    } else {
      router.push('/login')
    }
  }, [user])

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
