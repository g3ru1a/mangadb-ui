'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import {API} from "~/lib/mdb-api";
import {UnprocessableContentError, UserNotFoundError} from "mangadb-api";

export default function PasswordReset(props: any) {

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const email = event.target.email.value;
        try{
            await API.Auth.resetPassword(email);
            toast('Check your email inbox for a password reset link.',
                { type: 'success', autoClose: 8000 });
        }catch (err){
            if (typeof err !== "object" || err === null) return console.error(err);
            if (err instanceof UserNotFoundError)
                return toast("No user with that email exists.",
                    {type: "error", autoClose: 3000});
            if (err instanceof UnprocessableContentError){
                let errorMessage = "Unprocessable Content";
                if(err.data.message != null) errorMessage = err.data.message;
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
