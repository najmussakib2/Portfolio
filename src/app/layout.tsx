import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AnalyticsProvider } from '@/components/AnalyticsProvider'

export const metadata: Metadata = {
  title: 'Najmus Sakib — Full Stack Developer',
  description: 'Full Stack Developer from Bangladesh specializing in Next.js, React, Node.js and Supabase.',
  keywords: ['Full Stack Developer', 'Next.js', 'React', 'Supabase', 'Bangladesh'],
  openGraph: {
    title: 'Najmus Sakib — Full Stack Developer',
    description: 'Building modern, scalable web applications.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className='flex flex-col justify-center items-center'>
        <ThemeProvider>
          <AnalyticsProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
