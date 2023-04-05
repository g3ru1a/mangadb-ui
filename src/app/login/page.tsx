'use client'

import { useState } from 'react'
import axios from '~/lib/axios'
import './page.module.css'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({})

  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    try {
      const res = await axios.post('/api/login', formData)

      if (res.status === 200) {
        localStorage.setItem('auth', JSON.stringify(res.data))
        router.push('/books')
      }
    } catch (err: any) {
      console.log(err)
      if (err.response.status === 404) console.log('handle user not found')
      if (err.response.status === 422) console.log('handle bad username or password')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" onChange={handleInputChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}
