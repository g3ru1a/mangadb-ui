'use client'

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {API} from "~/lib/mdb-api";
import {AlreadyAuthenticatedError, UnprocessableContentError} from "mangadb-api";
import {useRouter} from "next/navigation";

export default function Register(props: any) {
    const router = useRouter();
    const [error, setError] = useState<null | string>(null);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const name = event.target.name.value;
            const email = event.target.email.value;
            const password = event.target.password.value;
            const confirmPassword = event.target.confirmPassword.value;
            const success = await API.Auth.register(name, email, password, confirmPassword);
            if(success) {
                toast('Success! See email for verification link.', {
                    type: 'success', autoClose: 4000 });
            }
        }catch (err) {
            if (typeof err !== "object" || err === null) return console.error(err);
            if (err instanceof AlreadyAuthenticatedError){
                const url = process.env.NEXT_PUBLIC_POST_AUTH_REDIRECT || "/dashboard";
                return router.push(url);
            }
            if (err instanceof UnprocessableContentError){
                let errorMessage = "Unprocessable Content";
                if(err.data.message != null) errorMessage = err.data.message;
                setError(errorMessage)
                return toast(errorMessage,
                    {type: "error", autoClose: 3000});
            }

            console.error(err);
            return toast("Unexpected Error",
                {type: "error", autoClose: 3000});
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
