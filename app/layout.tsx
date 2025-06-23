import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ModernShop - Premium E-Commerce Experience',
  description: 'Discover premium products with exceptional quality and service. Your one-stop destination for modern shopping.',
  keywords: 'e-commerce, online shopping, premium products, modern shop',
  authors: [{ name: 'ModernShop Team' }],
  creator: 'ModernShop',
  publisher: 'ModernShop',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://modernshop.com',
    title: 'ModernShop - Premium E-Commerce Experience',
    description: 'Discover premium products with exceptional quality and service.',
    siteName: 'ModernShop',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ModernShop - Premium E-Commerce Experience',
    description: 'Discover premium products with exceptional quality and service.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}