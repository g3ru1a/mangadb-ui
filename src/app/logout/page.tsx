'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import axios from '~/lib/axios'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    localStorage.removeItem('auth')

    const logout = async () => {
      try {
        const res = await axios.post('/logout')
        console.log(res)
      } catch (err: any) {
        console.log(err)
      }
    }
    logout()
  })

  router.push('/')
}
