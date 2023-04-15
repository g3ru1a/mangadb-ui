'use client'

import { useState } from 'react'
import axios from '~/lib/axios'
import './page.module.css'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { AuthData } from '~/lib/auth-types'

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
            const res = await axios.post('/login', formData)

            if (res.status === 200) {
                const authData: AuthData = res.data as AuthData
                localStorage.setItem('auth', JSON.stringify(authData))
                router.push('/books')
            }
        } catch (err: any) {
            console.log(err)
            if (err.response.status === 404) {
                toast('User not found.', {
                    type: 'error',
                    autoClose: 3000,
                })
            }
            if (err.response.status === 422)
                toast('Incorrect username or password.', {
                    type: 'warning',
                    autoClose: 3000,
                })
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
