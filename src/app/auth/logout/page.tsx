'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {API} from "~/lib/mdb-api";
import {UnauthenticatedError} from "mangadb-api";

export default function Logout() {
    const router = useRouter()

    useEffect(() => {
        const logout = async () => {
            try {
                await API.Auth.logout();
                router.push('/')
            } catch (err: any) {
                if (err instanceof UnauthenticatedError) return router.push("/login");
                console.error(err);
            }
        }
        logout()
    });
}
