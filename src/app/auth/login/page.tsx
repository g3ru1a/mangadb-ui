'use client'

import './page.module.css'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { API } from "~/lib/mdb-api";
import { UnprocessableContentError, UserNotFoundError, AlreadyAuthenticatedError } from "mangadb-api";

export default function Login() {
    const router = useRouter()

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const email = event.target.email.value;
            const password = event.target.password.value;
            await API.Auth.login(email, password);
            const url = process.env.NEXT_PUBLIC_POST_AUTH_REDIRECT || "/dashboard";
            return router.push(url);
        }catch (err) {
            if (typeof err !== "object" || err === null) return console.error(err);
            if (err instanceof AlreadyAuthenticatedError){
                const url = process.env.NEXT_PUBLIC_POST_AUTH_REDIRECT || "/dashboard";
                return router.push(url);
            }
            if (err instanceof UserNotFoundError)
                return toast("User not found",
                {type: "error", autoClose: 3000});
            if (err instanceof UnprocessableContentError)
                return toast("Incorrect username or password",
                    {type: "error", autoClose: 3000});
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
                        // onChange={(event) => handleInputChange(event)}
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
                        // onChange={(event) => handleInputChange(event)}
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
