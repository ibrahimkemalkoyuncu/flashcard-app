'use client'

export async function logout() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/auth/login'
  } catch (error) {
    console.error('Logout failed:', error)
  }
}