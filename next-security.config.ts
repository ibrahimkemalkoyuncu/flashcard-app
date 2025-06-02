export const securityHeaders = [
    // ... Yukarıdaki güvenlik başlıkları ...
  ]
  
  export const securitySettings = {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    }
  }