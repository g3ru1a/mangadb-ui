'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getAxiosInstance } from '~/lib/axios'

export default function Logout() {
    const router = useRouter()

    useEffect(() => {
        const logout = async () => {
            try {
                const axios = getAxiosInstance(true)
                const res = await axios.post('/logout')
                console.log(res)
                if (res.status === 200) {
                    localStorage.removeItem('auth')
                }
            } catch (err: any) {
                console.log(err)
            }
        }
        logout()
    })

    router.push('/')
}
