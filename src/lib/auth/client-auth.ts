'use client'

import { login as serverLogin } from '@/app/api/auth/login/route'

export async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  return response.ok
}

export async function logout() {
  await fetch('/api/auth/logout', { method: 'POST' })
}