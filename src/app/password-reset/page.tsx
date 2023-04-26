'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from '~/lib/axios'

export default function PasswordReset(props: any) {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await axios.post('/password/reset', {
                email,
            })

            if (res.status === 200) {
                if (res.data.message === 'email_sent') {
                    toast(
                        'If a user with that email exists, you should recieve a link to reset in your email.',
                        {
                            type: 'success',
                            autoClose: 8000,
                        }
                    )
                    return
                }
            }
        } catch (err: any) {
            console.log(err)
            if (err.response.status === 422) {
                toast(
                    'If a user with that email exists, you should recieve a link to reset in your email.',
                    {
                        type: 'success',
                        autoClose: 8000,
                    }
                )
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
                <h2 className="text-2xl font-medium mb-4">Password Reset</h2>
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
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        type="submit"
                    >
                        Send Reset Link
                    </button>
                </div>
            </form>
        </div>
    )
}
