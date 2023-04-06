'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from '~/lib/axios'

export default function VerifyEmail(props: any) {
  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState(false)
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const verifyEmail = async (token: string) => {
      try {
        const res = await axios.post('/api/verify', { payload: token })

        if (res.status === 200) {
          localStorage.setItem('auth', JSON.stringify(res.data))
          setVerified(true)
          setLoading(false)

          setTimeout(() => {
            router.push('/books')
          }, 2000)
        }
      } catch (err: any) {
        console.log(err)
      }
    }

    const payload = params.get('payload')

    if (payload) {
      verifyEmail(payload)
    }
  }, [params])

  if (loading) {
    return <div>Verifying Email...</div>
  }

  if (verified) {
    return <div>Email Verified!</div>
  }
}
