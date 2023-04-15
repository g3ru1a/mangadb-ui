'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from '~/lib/axios'

export default function Register(props: any) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<null | string>(null)

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
            const res = await axios.post('/register', {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            })

            if (res.status === 200) {
                if (res.data.message === 'registered') {
                    toast('Success! See email for verification link.', {
                        type: 'success',
                        autoClose: 4000,
                    })
                    return
                }
            }
        } catch (err: any) {
            if (err.response.status === 422) {
                toast('User already exists.', {
                    type: 'warning',
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

    return (
        <div className="flex justify-center items-center h-screen">
            <form
                className="bg-white p-6 rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-medium mb-4">Register</h2>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        className="border border-gray-400 p-2 w-full rounded-md"
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                        onChange={(e) => setEmail(e.target.value)}
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
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}
