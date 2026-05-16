import './globals.css'

export const metadata = {
  title: 'Vaagdevi College of Engineering',
  description: 'Student Marks Management System - Vaagdevi College of Engineering',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'VCE Marks',
  },
  applicationName: 'VCE Marks',
}

export const viewport = {
  themeColor: '#4CAF50',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="VCE Marks" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="VCE Marks" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#4CAF50" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(reg) { console.log('SW registered'); })
                  .catch(function(err) { console.log('SW failed:', err); });
              });
            }
          `
        }} />
      </body>
    </html>
  )
}

