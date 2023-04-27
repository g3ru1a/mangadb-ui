'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {API} from "~/lib/mdb-api";
import {toast} from "react-toastify";
import {BadPayloadError} from "mangadb-api";

export default function VerifyEmail(props: any) {
    const [loading, setLoading] = useState(true)
    const [verified, setVerified] = useState(false)
    const params = useSearchParams()
    const router = useRouter()

    useEffect(() => {

        const verifyEmail = async (token: string) => {
            try {
                await API.Auth.verifyEmail(token);
                setVerified(true);
                setLoading(false);

                setTimeout(() => {
                    const url = process.env.NEXT_PUBLIC_POST_AUTH_REDIRECT || "/dashboard";
                    return router.push(url);
                }, 2000);
            }catch (err: any) {
                if (typeof err !== "object" || err === null) return console.error(err);
                if (err instanceof BadPayloadError)
                    return toast("No user with that email exists.",
                        {type: "error", autoClose: 3000});
                console.error(err);
                return toast("Unexpected Error",
                    {type: "error", autoClose: 3000});
            }
        }

        const payload = params.get('payload')
        if (payload) {
            verifyEmail(payload);
        }
    }, [params]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="mx-auto h-16 w-16">
                        <div className="relative inline-block">
                            <div>
                                <svg
                                    width="64"
                                    height="64"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                                        <animateTransform
                                            attributeName="transform"
                                            type="rotate"
                                            dur="0.75s"
                                            values="0 12 12;360 12 12"
                                            repeatCount="indefinite"
                                        />
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-medium mb-4">Verifying</h2>
                    <p className="text-gray-700">
                        Please wait while we verify your email address.
                    </p>
                </div>
            </div>
        )
    }

    if (verified) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <svg
                        className="mx-auto h-16 w-16 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                    <h2 className="text-2xl font-medium mb-4">
                        Email Verified
                    </h2>
                    <p className="text-gray-700">
                        Your email has been successfully verified.
                    </p>
                </div>
            </div>
        )
    }
}
