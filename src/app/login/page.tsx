'use client'

import { useEffect, useState } from 'react'
import axios from '~/lib/axios'
import './page.module.css'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({})

  const handleInputChange = (event: any) => {
    console.log(formData)
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
      if (err.response.status === 422)
        console.log('handle bad username or password')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-medium mb-4">Log in</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border border-gray-400 p-2 w-full rounded-md"
            type="email"
            name="email"
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-gray-400 p-2 w-full rounded-md"
            type="password"
            name="password"
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  )
}
