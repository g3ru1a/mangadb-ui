'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from '~/lib/axios'

export default function PasswordVerify(props: any) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<null | string>(null)
  const [tokenError, setTokenError] = useState<null | string>(null)
  const router = useRouter()
  const params = useSearchParams()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        setError('Passwords must be the same.')
        throw new Error('Passwords must be the same')
      } else {
        setError(null)
      }
    }

    try {
      const res = await axios.post('/api/password/verify', {
        payload: params.get('payload'),
        password,
        password_confirmation: confirmPassword,
      })

      if (res.status === 200) {
        if (res.data.message === 'invalid_token') {
          toast('Invalid Token. Please request another password reset link.', {
            type: 'error',
            autoClose: 8000,
          })

          setTimeout(() => {
            router.push('/password-reset')
          }, 8000)
        }
        if (res.data.message === 'password_reset') {
          toast('Success! Your password has been reset.', {
            type: 'success',
            autoClose: 4000,
          })

          setTimeout(() => {
            router.push('/login')
          }, 4000)
          return
        }
      }
    } catch (err: any) {
      if (err.response.status === 422) {
        toast('Token Error.', {
          type: 'error',
          autoClose: 3000,
        })
        return
      }

      toast('There was an error.', {
        type: 'error',
        autoClose: 3000,
      })
      return
    }
  }

  useEffect(() => {
    if (!params.get('payload')) setTokenError('Missing Token.')
  }, [params])

  if (tokenError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
            />
          </svg>
          <h2 className="text-2xl font-medium mb-4">{tokenError}</h2>
          <p className="text-gray-700">
            There was an error processing your password reset link. Please try
            the process again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-medium mb-4">Reset Password</h2>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            className="border border-gray-400 p-2 w-full rounded-md"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="border border-gray-400 p-2 w-full rounded-md"
            type="password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  )
}
