import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [], // Google, GitHub vs. provider'lar eklenebilir
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')
      
      if (isOnAdmin) {
        if (isLoggedIn) return true
        return false // Redirect to login page
      }
      return true
    },
  },
} satisfies NextAuthConfig