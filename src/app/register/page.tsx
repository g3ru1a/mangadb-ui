'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from '~/lib/axios'

export default function Register(props: any) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post('/api/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      })

      if (res.status === 200) {
        if (res.data.message === 'registered') {
          // toast success
        }

        if (res.data.message === 'user_exists') {
          // toast warning
        }
      }
    } catch (err: any) {
      // toast error
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="password_confirmation">
          Confirm Password:
          <input
            type="password"
            id="confirm-password"
            name="password_confirmation"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
